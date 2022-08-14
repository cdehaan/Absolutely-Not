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

import WelcomeScreen from './WelcomeScreen';


const App: () => Node = () => {

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const [displayedScreens, setDisplayedScreens] = useState({welcome: true, lobby: false});

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? "#336699" : "#a2bfdd", };

    useEffect(() => {
        Animated.timing(welcomeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);



    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {displayedScreens.welcome ? <WelcomeScreen anim={welcomeAnim} setScreens={setDisplayedScreens} /> : null}
        </SafeAreaView>
    );
};

export default App;
