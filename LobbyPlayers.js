import {Node, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import { CompetitorsContext } from './App';

const LobbyPlayers = (props): Node => {
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

    const competitors = useContext(CompetitorsContext);

    const playersAnim = props.anim;
    const playersOpacity = playersAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5, 1] });

    const styles = StyleSheet.create({
        headerView: {
            opacity: playersOpacity,
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

    return (
        <View style={{ flex: 1}} >
            <Text>Players: {competitors && competitors.length}</Text>
        </View>
    );
};
  
export default LobbyPlayers;
          