import {Node, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import React from 'react';

import WelcomeHeader from './WelcomeHeader';
import WelcomeBanner from './WelcomeBanner';

const WelcomeScreen = (props): Node => {
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

    const isDarkMode = false;
    const backgroundColor = isDarkMode ? "#336699" : "#ecf2f9";

    const screenAnim = props.screensState.anim;
    const screenOpacity = screenAnim.interpolate({ inputRange:[0, 0.5, 1], outputRange:[0, 1, 1] });
  
    const styles = StyleSheet.create({
        mainView: {
          height: windowMaxDimensions.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
          backgroundColor: backgroundColor,
          opacity: screenOpacity,
        },
    });
    
    return (
        <Animated.View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <WelcomeHeader anim={screenAnim} start={0}   end={1}   />
            <WelcomeBanner anim={screenAnim} start={0.2} end={0.8} setScreens={props.setScreens} title='New Game'  targetScreen='lobby'/>
            <WelcomeBanner anim={screenAnim} start={0.4} end={1}   setScreens={props.setScreens} title='Join Game' targetScreen='join'/>
        </Animated.View>
    );
};
  
export default WelcomeScreen;
