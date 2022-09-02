import {Node, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const LobbyQR = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;
    const gameData = useContext(GameContext).game;

    /*
    const optionsAnim = props.anim;
    const optionsOpacity = optionsAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });
    */
   const optionsOpacity = 1;

    const styles = StyleSheet.create({
        headerView: {
            opacity: optionsOpacity,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
            paddingTop: windowDimensions.max.height / 20,
            paddingBottom: windowDimensions.max.height / 20,
        },
        headerText: {
            fontSize: windowDimensions.max.height / 15,
            fontFamily: 'DancingScript-Bold',
            alignSelf: 'center',
            color: "#fff",
        },
        debug: {
            backgroundColor: "powderblue",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        }
    });

    const QrHeight = Math.min(windowDimensions.max.width*0.8, windowDimensions.max.height*0.5);

    return (
        <View style={{height: QrHeight}}>
            <Text>{gameData.code}</Text>
        </View>
    );
};
  
export default LobbyQR;
          