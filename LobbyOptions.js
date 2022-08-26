import {Node, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const LobbyOptions = (props): Node => {
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

    const optionsAnim = props.anim;
    const optionsOpacity = optionsAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });

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
    });

    const optionsList = [
        {name: "Game Options", key: 1, options: [
            {text: "Private Game", id: "private", value: false},
            {text: "Timed Game", id: "timed", value: false}
        ]},
        {name: "Question Types", key: 2, options: [
            {text: "Sexy Questions", id: "sexy", value: false},
            {text: "Dark Questions", id: "dark", value: false},
            {text: "Trivia Questions", id: "trivia", value: false}
        ]}
    ];

    const options = optionsList.map(category => {
        const optionList = category.options.map(option => {
            return(<Text key={option.id}>○⦿{option.text}</Text>);
        })

        return(
            <>
            <Text key={category.key}>{category.name}</Text>
            {optionList}
            </>
        )        
    });

    return (
        <View style={{ flex: 1}} >            
            {options}
        </View>
    );
};
  
export default LobbyOptions;
          