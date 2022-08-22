import {Node, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Animated, Text} from 'react-native';
import React from 'react';
import Header from './Header';
import LobbyOptions from './LobbyOptions';
import LobbyPlayers from './LobbyPlayers';
import LobbyStart from './LobbyStart';
import LobbyQR from './LobbyQR';

const LobbyScreen = (props): Node => {
    const [windowMaxDimensions, setWindowMaxDimensions] = useState({width: Dimensions.get('window').width, height: Dimensions.get('window').height});
    useEffect(() => {
        const subscription = Dimensions.addEventListener( "change",
        ({ window }) =>
            { setWindowMaxDimensions((previousWindowDimensions) =>
                {return { width: Math.max(previousWindowDimensions.width, window.width), height: Math.max(previousWindowDimensions.height, window.height) }});
            }
        );
        return () => subscription?.remove();
    });

    // Fade in screen when component first rendered
    const screenAnim = props.screensState.anim;
    useEffect(() => {
        Animated.timing(screenAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, []);
    const screenOpacity = screenAnim.interpolate({ inputRange:[0, 0.5, 1], outputRange:[0, 1, 1] });
    

    const styles = StyleSheet.create({
        mainView: {
          height: windowMaxDimensions.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
          backgroundColor: '#ecf2f9',
          opacity: screenOpacity,
        },
    });

    return (
        <Animated.View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <Header/>
            <LobbyOptions anim={screenAnim}/>
            <LobbyPlayers/>
            <LobbyStart anim={screenAnim}/>
            <LobbyQR/>
        </Animated.View>
    );
};
  
export default LobbyScreen;
