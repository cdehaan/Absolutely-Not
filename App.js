/**
 * @format
 * @flow strict-local
 */

import {createContext, Node} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import { io } from "socket.io-client";

import JoinScreen from './JoinScreen';
import LobbyScreen from './LobbyScreen';
import WelcomeScreen from './WelcomeScreen';


export const PlayersContext = createContext();

const App: () => Node = () => {

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const joinAnim = useRef(new Animated.Value(0)).current;
    const lobbyAnim = useRef(new Animated.Value(0)).current;

    const [screensState, setScreenState] = useState({welcome: {display: true, anim: welcomeAnim}, join: {display: false, anim: joinAnim}, lobby: {display: false, anim: lobbyAnim}});
    //const [competitors, setCompetitors] = useState([]);
    //const [competitors, setCompetitors] = useState([{playerKey: 19, name: "Dave", socket: 567}, {playerKey: 20, name: "Ryan", socket: 8910}, {playerKey: 21, name: "Andrew", socket: 1112}]);
    const [players, setPlayers] = useState({
        me: {playerKey: null, name: null, secret: null, socket: null},
        competitors:[
            {playerKey: 19, name: "Dave5", socket: 567},
            {playerKey: 20, name: "Ryan", socket: 8910},
            {playerKey: 21, name: "Andrew", socket: 1112},
            {playerKey: 39, name: "Dave2", socket: 5672},
            {playerKey: 30, name: "Ryan2", socket: 89102},
            {playerKey: 31, name: "Andrew2", socket: 11122},
            {playerKey: 49, name: "Dave3", socket: 5673},
            {playerKey: 40, name: "Ryan3", socket: 89103},
            {playerKey: 41, name: "Andrew3", socket: 11123},
            {playerKey: 59, name: "Dave4", socket: 5674},
            {playerKey: 50, name: "Ryan4", socket: 89104},
            {playerKey: 51, name: "Andrew4", socket: 11124},
        ]
    });
    const [game, setGame] = useState({
        gameKey: null,
        code: null,
        secret: null,
        questionKey: null,
        revealed: null,
        private: null,
        active: null,
        created: null,
        started: null,
    });


    // reference set for socketRef using useRef hook
    const socketRef = useRef();

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? "#336699" : "#a2bfdd", };


    useEffect(() => {
        // Fade in the welcome screen
        Animated.timing(welcomeAnim, { toValue: 1, duration: 1000, useNativeDriver: false, }).start();

        // Create a socket with the server
        ConnectSocket();

        // Disconnect on unload
        return () => { socketRef.current.disconnect(); };
    }, []);

    function CreateGame() {
        socketRef.current.emit('create game', {playerName: "Chris"});
    }

    function JoinGame() {
        socketRef.current.emit('join game', {gameCode: "ABCDE"});
    }

    function ConnectSocket() {
        socketRef.current = io('http://192.168.0.18:2525');

        socketRef.current.on('connect',              function()    { SocketConnected();        });
        socketRef.current.on('disconnect',           function()    { SocketDisconnected();     });
    
        // All the game events we have to listen for
        socketRef.current.on("game created",         function(msg) { GameCreated(msg);         });
        socketRef.current.on("game joined",          function(msg) { GameJoined(msg);          });
    }

    function SocketConnected() {
        console.log("Connected");
        setPlayers(prevData => {
            const newData = {...prevData};
            newData.me.socket = socketRef.current;
            return newData;
        });
    }

    function SocketDisconnected() {
        console.log("Disconnected");
    }

    function GameCreated(msg) {
        msg = JSON.parse(msg);
        if(msg.success === false) {console.log("Error creating game: " + msg.error);}

        delete msg.success;
        setPlayers(prevData => {
            const newData = {...prevData};
            newData.me = {...newData.me, ...msg.player};
            return newData;
        })
        setGame(prevData => {
            const newData = {...prevData, ...msg.game};
            return newData;
        })
        console.log(`${msg.player.name} created a game ${msg.game.gameCode}.`);
    }

    function GameJoined(msg) {
        console.log("Joined");
        console.log(msg);
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <PlayersContext.Provider value={players}>
                {screensState.welcome.display ? <WelcomeScreen screensState={screensState.welcome} setScreens={setScreenState} CreateGame={CreateGame} JoinGame={JoinGame} /> : null}
                {screensState.lobby.display   ? <LobbyScreen   screensState={screensState.lobby}   setScreens={setScreenState} /> : null}
                {screensState.join.display    ? <JoinScreen    screensState={screensState.join}    setScreens={setScreenState} /> : null}
            </PlayersContext.Provider>
        </SafeAreaView>
    );
};

export default App;
