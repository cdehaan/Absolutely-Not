/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, useColorScheme, } from 'react-native';

import JoinScreen from './JoinScreen';
import WelcomeScreen from './WelcomeScreen';


const App: () => Node = () => {

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const joinAnim = useRef(new Animated.Value(0.5)).current;
    const lobbyAnim = useRef(new Animated.Value(0)).current;

    const [screensState, setScreenState] = useState({welcome: {display: true, anim: welcomeAnim}, join: {display: false, anim: joinAnim}, lobby: {display: false, anim: lobbyAnim}});

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: !isDarkMode ? "#336699" : "#a2bfdd", };


    // Show the welcome screen on load
    useEffect(() => {
        Animated.timing(welcomeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);

    useEffect(() => {
        return;
        Object.keys(screensState).forEach(key => {
            if(screensState[key] === true) {
                Animated.timing(welcomeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();
            } else {
                Animated.timing(welcomeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();
            }
        });
        
    }, [screensState]);


    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {screensState.welcome.display ? <WelcomeScreen screensState={screensState.welcome} setScreens={setScreenState} /> : null}
            {screensState.join.display    ? <JoinScreen    screensState={screensState.join}    setScreens={setScreenState} /> : null}
        </SafeAreaView>
    );
};

export default App;
