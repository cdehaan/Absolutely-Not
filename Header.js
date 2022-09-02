import {Node, useContext, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const Header = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    /*
    const headerAnim = props.anim;
    const headerOpacity = headerAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });
    */
    const headerOpacity = 1;

    const styles = StyleSheet.create({
        headerView: {
            opacity: headerOpacity,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
            paddingTop: windowDimensions.max.height / 100,
            paddingBottom: windowDimensions.max.height / 100,
        },
        headerText: {
            fontSize: windowDimensions.max.height / 30,
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

    return (
        <View>
        <Animated.View style={styles.headerView}>
            <View style={{width: windowDimensions.max.width, alignSelf: 'center', backgroundColor: "#336699"}}>
                <Text style={styles.headerText}>Absolutely Not</Text>
            </View>
        </Animated.View>
        </View>
    );
};
  
export default Header;
          