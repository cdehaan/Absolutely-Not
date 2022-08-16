/**
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import { io } from "socket.io-client";

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

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? "#336699" : "#a2bfdd", };


    useEffect(() => {
        // Show the welcome screen
        Animated.timing(welcomeAnim, { toValue: 1, duration: 1000, useNativeDriver: false, }).start();

        // Create a socket with the server
        ConnectSocket();
    }, []);

    function CreateGame() {

    }

    function ConnectSocket() {
        socket = io();
        socket.on('connect',              function()    { SocketConnected();        });
        socket.on('disconnect',           function()    { SocketDisconnected();     });
    
        // All the game events we have to listen for
        socket.on("game created",         function(msg) { GameCreated(msg);         });
    }

    function SocketConnected() {
        alert("Connected");
    }

    function SocketDisconnected() {

    }

    function GameCreated(msg) {

    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {screensState.welcome.display ? <WelcomeScreen screensState={screensState.welcome} setScreens={setScreenState} /> : null}
            {screensState.lobby.display   ? <LobbyScreen   screensState={screensState.lobby}   setScreens={setScreenState} /> : null}
            {screensState.join.display    ? <JoinScreen    screensState={screensState.join}    setScreens={setScreenState} /> : null}
        </SafeAreaView>
    );
};

export default App;
