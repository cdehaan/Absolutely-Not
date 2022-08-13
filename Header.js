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
        headerView: {
            opacity: headerOpacity,
            width: headerWidth,
            borderTopWidth: headerBorder,
            borderBottomWidth: headerBorder,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
            paddingTop: windowMaxDimensions.height / 20,
            paddingBottom: windowMaxDimensions.height / 20,
        },
        headerText: {
            fontSize: windowMaxDimensions.height / 20,
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
            <View style={{width: windowMaxDimensions.width, alignSelf: 'center', backgroundColor: "#336699"}}>
                <Text style={styles.headerText}>Absolutely Not</Text>
            </View>
        </Animated.View>
        </View>
    );
};
/*
        <Button title="Fade In Header" onPress={ExpandHeader} />
        <Button title="Fade Out Header" onPress={ShrinkHeader} />
*/
  
export default Header;
          