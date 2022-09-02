import {Node, useContext, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Animated, Text} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const JoinScreen = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    const screenAnim = props.screensState.anim;
    const screenOpacity = screenAnim.interpolate({ inputRange:[0, 0.5, 1], outputRange:[0, 1, 1] });
  
    const styles = StyleSheet.create({
        mainView: {
          height: windowDimensions.max.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
          backgroundColor: '#996633',
          opacity: screenOpacity,
        },
    });

    return (
        <Animated.View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <Text>Join Screen</Text>
        </Animated.View>
    );
};
  
export default JoinScreen;
