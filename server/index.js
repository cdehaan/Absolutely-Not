const SanitizeData = require("./SanitizeData");

require('dotenv').config();

const express = require("express");
const app = express();

const ip = require('ip');
const ipAddress = ip.address();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {pingTimeout: 60000});
const port = 2525;

server.listen(port, () => console.log(`server running at ${ipAddress}:${port}`));

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const allPlayers = []; // Array of: {socket, playerKey, playerSecret}s

io.on("connection", (socket) => {
    /*
    socket.on('event name', (sendData) => {
        // socket.emit('event name', data);               // back to sender
        // socket.to("room1").emit('event name', data);   // everyone in room except sender
        // io.in("room1").emit('event name', data);       // everyone in room
    });
    */

    console.log("a user connected");
    io.emit("message", {message: "hi", sid: 19, time: new Date().toLocaleTimeString(), rid: 20});

    socket.on("message",     (msg) => { console.log(msg); });
    socket.on("create game", (msg) => { GenerateGame(socket, msg); });
    socket.on("join game",   (msg) => { JoinGame(socket, msg); });
});

async function GenerateGame(socket, requestData){
    const returnData = {success: false};
    const requiredData = ["playerName"];

    requestData = await SanitizeData.Check(requestData, requiredData);
    if(requestData.clean === false) {
        returnData.error = "SanitizeData failed when creating game. " + requestData.error;
        socket.emit('game created', JSON.stringify(returnData));
        return;
    }
    const playerName = requestData.playerName.substring(0,12);
    returnData.playerName = playerName;

    const playerSecret = Math.random().toString(36).slice(2).replace(/[^0-9a-z]/gi, '');
    returnData.playerSecret = playerSecret;

    // Generate a random 5-letter string for the room code. If this code already exists, make another.
    let newGameCode;
    while (true) {
        newGameCode = "";
        for (let i=0; i < 5; i++) {newGameCode += String.fromCharCode(Math.floor((Math.random() * 26) + 65));}
        const gameExistsResult = await pool.query(`SELECT count(*) AS gameCount FROM game WHERE code='${newGameCode}';`);
        if (!gameExistsResult) {
            returnData.error = "Couldn't check for existing game code.";
            socket.emit('game created', JSON.stringify(returnData));
            return;
        }
        if (gameExistsResult[0][0].gameCount === 0) { break; }
    }
    returnData.playerKey = newGameCode;


    // Create the room in the database then put the room creator into the room
    const gameSecret = Math.random().toString(36).slice(2).replace(/[^0-9a-z]/gi, '');

    const insertGameResult = await pool.query(`INSERT INTO game (code, secret) VALUES ('${newGameCode}', '${gameSecret}');`);
    const gameKey = insertGameResult[0].insertId;

    const insertPlayerResult = await pool.query(`INSERT INTO player (name, secret, game_key) VALUES ('${playerName}', '${playerSecret}', ${gameKey});`);
    const playerKey = insertPlayerResult[0].insertId;
    returnData.playerKey = playerKey;
    

    returnData.success = true;
    socket.emit('game created', JSON.stringify(returnData));
}

async function JoinGame(socket, joinData){
    const returnData = {success: false};
    const requiredData = ["gameCode"];

    joinData = await SanitizeData.Check(joinData, requiredData);
    if(joinData.clean === false) {
        returnData.error = "SanitizeData failed when joining game. " + joinData.error;
        socket.emit('game joined', JSON.stringify(returnData));
        return;
    }
    const gameCode = joinData.gameCode.substring(0,12);
    const playerSecret = Math.random().toString(36).slice(2).replace(/[^0-9a-z]/gi, '');
    returnData.playerSecret = playerSecret;

    returnData.success = true;
    socket.emit('game created', JSON.stringify(returnData));
}

