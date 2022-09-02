import {Node, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const LobbyStart = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    const buttonAnim = props.anim;
    const buttonOpacity = buttonAnim.interpolate({ inputRange:[0, 0.5, 1],  outputRange:[0, 0, 1] });
    const buttonWidth   = buttonAnim.interpolate({ inputRange:[0, 0.25, 1], outputRange:["0%", "0%", "90%"] });
    const buttonBorder  = buttonAnim.interpolate({ inputRange:[0, 0.25, 1], outputRange:[ 0, 0, 2] });

    const styles = StyleSheet.create({
        headerView: {
            opacity: buttonOpacity,
            width: buttonWidth,
            borderRadius: 10,
            borderRightWidth: buttonBorder,
            borderBottomWidth: buttonBorder,
            backgroundColor: "#fff",
            alignSelf: 'center',
            overflow: 'hidden',
        },
        headerText: {
            fontSize: windowDimensions.max.height / 20,
            color: "#336",
            alignSelf: 'center',
        },
    });

    return (
        <View>
        <Animated.View style={styles.headerView}>
            <View style={{width: windowDimensions.max.width, alignSelf: 'center'}}>
                <Text style={styles.headerText}>Start</Text>
            </View>
        </Animated.View>
        </View>
    );
};
  
export default LobbyStart;
          