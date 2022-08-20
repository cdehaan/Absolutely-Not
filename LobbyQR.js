import {Node, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const LobbyQR = (props): Node => {
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

    /*
    const optionsAnim = props.anim;
    const optionsOpacity = optionsAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });
    */
   const optionsOpacity = 1;

    const styles = StyleSheet.create({
        headerView: {
            opacity: optionsOpacity,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
            paddingTop: windowMaxDimensions.height / 20,
            paddingBottom: windowMaxDimensions.height / 20,
        },
        headerText: {
            fontSize: windowMaxDimensions.height / 15,
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

    const QrHeight = Math.min(windowMaxDimensions.width*0.8, windowMaxDimensions.height*0.5);

    return (
        <View style={{height: QrHeight}}>
            <Text>QR</Text>
        </View>
    );
};
  
export default LobbyQR;
          