import {Node, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
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

    const screenAnim = props.anim;
    const screenOpacity = screenAnim.interpolate({ inputRange:[0, 0.5, 1], outputRange:[0, 1, 1] });
  
    const styles = StyleSheet.create({
        mainView: {
          height: windowMaxDimensions.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
          backgroundColor: '#336699',//'#ecf2f8'
          opacity: screenOpacity,
        },
    });
    
    return (
        <Animated.View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <WelcomeHeader anim={props.anim} start={0}   end={1}   />
            <WelcomeBanner anim={props.anim} start={0.2} end={0.8} setScreens={props.setScreens} title='New Game'/>
            <WelcomeBanner anim={props.anim} start={0.4} end={1}   setScreens={props.setScreens} title='Join Game'/>
        </Animated.View>
    );
};
  
export default WelcomeScreen;
