import {Node, useContext, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, Dimensions, Pressable} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const WelcomeBanner = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    const bannerAnim = props.anim;

    function HideWelcome() {
        props.BannerAction();

        Animated.timing(bannerAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            props.setScreens((prevScreens) => {
                const newScreens = {...prevScreens};
                newScreens.welcome.display = false;
                newScreens[props.targetScreen].display = true;
                return newScreens;
            });
        }, 500);
    }

    const bannerWidth  = bannerAnim.interpolate({ inputRange:[0, props.start, props.end, 1], outputRange:['0%', '0%', '90%', '90%'] });
    const bannerBorder = bannerAnim.interpolate({ inputRange:[0, props.start, props.end, 1], outputRange:[ 0, 0, 2, 2] });
    const styles = StyleSheet.create({
        banner: {
            width: bannerWidth,
            borderRadius: 10,
            borderRightWidth: bannerBorder,
            borderBottomWidth: bannerBorder,
            backgroundColor: "#fff",
            alignSelf: 'center',
            overflow: 'hidden',
        },
        titleText: {
            alignSelf: 'center',
            color: "#336",
            fontSize: windowDimensions.max.height / 20,
        }
    });

    return (
        <Animated.View style={styles.banner}>
            <Pressable onPress={() => {HideWelcome()}}>
            <Text numberOfLines={1} ellipsizeMode='clip' style={[{minWidth: windowDimensions.max.width*0.5}, styles.titleText]}>{props.title}</Text>
            </Pressable>
        </Animated.View>
    );
};
  
export default WelcomeBanner;
