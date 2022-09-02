import {Node, useContext, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import React from 'react';
import Header from './Header';
import LobbyOptions from './LobbyOptions';
import LobbyPlayers from './LobbyPlayers';
import LobbyStart from './LobbyStart';
import LobbyQR from './LobbyQR';
import { GameContext } from './App';

const LobbyScreen = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

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
          height: windowDimensions.max.height,
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
            <LobbyPlayers anim={screenAnim}/>
            <LobbyStart anim={screenAnim}/>
            <LobbyQR/>
        </Animated.View>
    );
};
  
export default LobbyScreen;
