/**
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View, Animated, SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import { io } from "socket.io-client";
import ChatStatus from './ChatStatus';

import JoinScreen from './JoinScreen';
import LobbyScreen from './LobbyScreen';
import WelcomeScreen from './WelcomeScreen';


const App: () => Node = () => {

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const joinAnim = useRef(new Animated.Value(0)).current;
    const lobbyAnim = useRef(new Animated.Value(0)).current;

    const [screensState, setScreenState] = useState({welcome: {display: true, anim: welcomeAnim}, join: {display: false, anim: joinAnim}, lobby: {display: false, anim: lobbyAnim}});
    const [myData, setMyData] = useState({playerKey: null, name: null, secret: null, socket: null});
    const [competitors, setCompetitors] = useState([]);

    // reference set for socketRef using useRef hook
    const socketRef = useRef();

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? "#336699" : "#a2bfdd", };


    useEffect(() => {
        // Show the welcome screen
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
    }

    function SocketDisconnected() {
        console.log("Disconnected");
    }

    function GameCreated(msg) {
        console.log("Created");
        console.log(msg);
    }

    function GameJoined(msg) {
        console.log("Joined");
        console.log(msg);
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {screensState.welcome.display ? <WelcomeScreen screensState={screensState.welcome} setScreens={setScreenState} CreateGame={CreateGame} JoinGame={JoinGame} /> : null}
            {screensState.lobby.display   ? <LobbyScreen   screensState={screensState.lobby}   setScreens={setScreenState} /> : null}
            {screensState.join.display    ? <JoinScreen    screensState={screensState.join}    setScreens={setScreenState} /> : null}
        </SafeAreaView>
    );
};

export default App;
