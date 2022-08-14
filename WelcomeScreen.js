import {Node, useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React from 'react';

import Header from './Header';
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
  
    const styles = StyleSheet.create({
        mainView: {
          height: windowMaxDimensions.height,
          overflow: 'hidden',
          justifyContent: 'space-evenly',
        },
    });
    
    return (
        <View
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.mainView]}
        contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <Header />
            <WelcomeBanner delay={200} title='New Game'>
                <Text>New Game</Text>
            </WelcomeBanner>
            <WelcomeBanner delay={400} title='Join Game'>
                <Text>Join Game</Text>
            </WelcomeBanner>
        </View>
    );
};
  
export default WelcomeScreen;
