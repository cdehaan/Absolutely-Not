import {Node, useContext, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Animated, View, TextInput} from 'react-native';
import React from 'react';
import { GameContext } from './App';

import WelcomeHeader from './WelcomeHeader';
import WelcomeBanner from './WelcomeBanner';

const WelcomeScreen = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    const [code, setCode] = useState(null);
    function OnChangeCode() {
        setCode("ABCDE");
    }

    const isDarkMode = false;
    const backgroundColor = isDarkMode ? "#336699" : "#ecf2f9";

    const screenAnim = props.screensState.anim;
    const screenOpacity = screenAnim.interpolate({ inputRange:[0, 0.5, 1], outputRange:[0, 1, 1] });
  
    const styles = StyleSheet.create({
        mainView: {
          height: windowDimensions.max.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
          backgroundColor: backgroundColor,
          opacity: screenOpacity,
        },
        input: {
            position: "absolute",
            width: "80%",
            zIndex: 10,
        },
    });
    
    return (
        <Animated.View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <WelcomeHeader anim={screenAnim} start={0}   end={1}   />
            <WelcomeBanner anim={screenAnim} start={0.2} end={0.8} setScreens={props.setScreens} title='New Game'  targetScreen='lobby' BannerAction={props.CreateGame}/>
            <WelcomeBanner anim={screenAnim} start={0.4} end={1}   setScreens={props.setScreens} title='Join Game' targetScreen='join'  BannerAction={props.JoinGame}/>
            <TextInput
                style={styles.input}
                onChangeText={OnChangeCode}
                value={code}
                placeholder="Game Code"
            />
        </Animated.View>
    );
};
  
export default WelcomeScreen;
