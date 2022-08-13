import {Node, useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const WelcomeBanner = (): Node => {
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

    const bannerAnim = useRef(new Animated.Value(0)).current;
    function ExpandBanner() {
        Animated.timing(bannerAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
        }).start();
    };

    function ShrinkBanner() {
        Animated.timing(bannerAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
        }).start();
    };


    const styles = StyleSheet.create({
        debug: {
            backgroundColor: "powderblue",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
    });

    return (
        <View style={styles.debug}>
        <Animated.View style={styles.banner}>
            <View style={{width: windowMaxDimensions.width, backgroundColor: "#336699"}}>
            <Text>
                This is my header.
            </Text>
            </View>
        </Animated.View>
        </View>
    );
};
  
export default WelcomeBanner;
