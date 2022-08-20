import {Node, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const LobbyStart = (props): Node => {
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

    const buttonAnim = props.anim;
    const buttonOpacity = buttonAnim.interpolate({ inputRange:[0, 0.5, 1],  outputRange:[0, 0, 1] });
    const buttonWidth   = buttonAnim.interpolate({ inputRange:[0, 0.25, 1], outputRange:["0%", "0%", "90%"] });
    const buttonBorder  = buttonAnim.interpolate({ inputRange:[0, 0.25, 1], outputRange:[ 0, 0, 2] });

    const styles = StyleSheet.create({
        headerView: {
            opacity: buttonOpacity,
            width: buttonWidth,
            borderRadius: 10,
            borderRightWidth: buttonBorder,
            borderBottomWidth: buttonBorder,
            backgroundColor: "#fff",
            alignSelf: 'center',
            overflow: 'hidden',
        },
        headerText: {
            fontSize: windowMaxDimensions.height / 20,
            color: "#336",
            alignSelf: 'center',
        },
    });

    return (
        <View>
        <Animated.View style={styles.headerView}>
            <View style={{width: windowMaxDimensions.width, alignSelf: 'center'}}>
                <Text style={styles.headerText}>Start</Text>
            </View>
        </Animated.View>
        </View>
    );
};
  
export default LobbyStart;
          