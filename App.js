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

import { Colors, } from 'react-native/Libraries/NewAppScreen';

import WelcomeScreen from './WelcomeScreen';


const App: () => Node = () => {

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const [welcomeDisplay, setWelcomeDisplay] = useState(true);

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };

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
            {welcomeDisplay ? <WelcomeScreen anim={welcomeAnim} display={setWelcomeDisplay} /> : null}
        </SafeAreaView>
    );
};

export default App;
