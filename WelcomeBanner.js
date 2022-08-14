import {Node, useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React from 'react';

const WelcomeBanner = (props): Node => {
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

    const bannerAnim = props.anim;

    function HideWelcome() {
        Animated.timing(bannerAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            props.display(false);
        }, 1000);
    }

    const bannerWidth = bannerAnim.interpolate({ inputRange:[0, 1],  outputRange:['0%', '90%'] });
    const bannerBorder = bannerAnim.interpolate({ inputRange:[0, 1], outputRange:[ 0,    2] });
    const styles = StyleSheet.create({
        debug: {
            backgroundColor: "powderblue",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        banner: {
            width: bannerWidth,
            borderTopWidth: bannerBorder,
            borderBottomWidth: bannerBorder,
            backgroundColor: '#fff',
            alignSelf: 'center',
            overflow: 'hidden',
        },
        titleText: {
            alignSelf: 'center',
            fontSize: windowMaxDimensions.height / 20,
        }
    });

    return (
        <Animated.View style={styles.banner}>
            <Pressable onPress={() => {HideWelcome()}}>
            <Text numberOfLines={1} ellipsizeMode='clip' style={[{minWidth: windowMaxDimensions.width*0.5}, styles.titleText]}>{props.title}</Text>
            </Pressable>
        </Animated.View>
    );
};
  
export default WelcomeBanner;
