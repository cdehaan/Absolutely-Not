import {Node, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
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
            <Header        anim={props.anim} start={0}   end={1}   />
            <WelcomeBanner anim={props.anim} start={0.2} end={0.8} display={props.display} title='New Game'/>
            <WelcomeBanner anim={props.anim} start={0.4} end={1}   display={props.display} title='Join Game'/>
        </View>
    );
};
  
export default WelcomeScreen;
