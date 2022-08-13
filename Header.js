import {Node, useEffect, useRef, useState} from 'react';
import {Animated, Button, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const Header = (): Node => {
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

    useEffect(() => {
        setTimeout(() => {
            ExpandHeader();            
        }, 500);
    });
  
    const headerAnim = useRef(new Animated.Value(0)).current;

    function ExpandHeader() {
        Animated.timing(headerAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
        }).start();
    };

    function ShrinkHeader() {
        Animated.timing(headerAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
        }).start();
    };

    const headerOpacity = headerAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });
    const headerBorder  = headerAnim.interpolate({ inputRange:[0, 1], outputRange:[0,     5] });
    const headerWidth   = headerAnim.interpolate({ inputRange:[0, 1], outputRange:['0%', '100%'] });

    const styles = StyleSheet.create({
        header: {
            opacity: headerOpacity,
            width: headerWidth,
            borderWidth: headerBorder,
            height: 100,
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: 'beige',
        },
        debug: {
            backgroundColor: "powderblue",
            borderWidth: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        }
    });

    return (
        <View style={styles.debug}>
        <Animated.View style={styles.header}>
            <View style={{width: windowMaxDimensions.width, backgroundColor: "#336699"}}>
            <Text>
                This is my header.
            </Text>
            </View>
        </Animated.View>
        <Button title="Fade In Header" onPress={ExpandHeader} />
        <Button title="Fade Out Header" onPress={ShrinkHeader} />
        </View>
    );
};
  
export default Header;
          