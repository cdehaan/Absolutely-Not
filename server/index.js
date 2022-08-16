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

