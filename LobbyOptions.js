import {Node, useContext, useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View, Dimensions, Pressable, Image} from 'react-native';
import React from 'react';
import { GameContext } from './App';

const LobbyOptions = (props): Node => {
    const windowDimensions = useContext(GameContext).windowDimensions;

    const [optionsList, setOptionsList] = useState([
        {name: "Game Options", key: 1, options: [
            {text: "Private", id: "private", value: false},
            {text: "Timed", id: "timed", value: false}
        ]},
        {name: "Question Types", key: 2, options: [
            {text: "Sexy", id: "sexy", value: true},
            {text: "Dark", id: "dark", value: true},
            {text: "Trivia", id: "trivia", value: false}
        ]}
    ]);

    const optionsAnim = props.anim;
    const optionsOpacity = optionsAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5,   1] });

    const styles = StyleSheet.create({
        headerView: {
            opacity: optionsOpacity,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
            paddingTop: windowDimensions.max.height / 20,
            paddingBottom: windowDimensions.max.height / 20,
        },
        headerText: {
            fontSize: windowDimensions.max.height / 15,
            fontFamily: 'DancingScript-Bold',
            alignSelf: 'center',
            color: "#fff",
        },
    });

    function ToggleOption(optionId) {
        setOptionsList(prevOptionsList => {
            const newOptionsList = [...prevOptionsList];
            newOptionsList.forEach(category => { category.options.forEach(option => {
                if(option.id === optionId) { option.value = !option.value; }
            }); })
            return newOptionsList;
        });
    }

    const options = optionsList === undefined ? undefined : optionsList.map(category => {
        const optionList = category.options.map(option => {
            const checkboxPath = option.value
            ? require('./assets/images/Checkbox-Checked.png')
            : require('./assets/images/Checkbox-Unchecked.png');
            return(
                <Pressable key={option.id} onPress={() => ToggleOption(option.id)}>
                    <Text key={option.id}><Image source={checkboxPath} style={{height:10, width:10}} />{option.text}</Text>
                </Pressable>
            );
            //{option.value === true ? "⦿" : "○"}
        })

        return(
            <View key={category.key}>
                <Text key={category.key}>{category.name}</Text>
                <View style={{flexDirection: "row"}}>{optionList}</View>
            </View>
        )        
    });

    return (
        <View key="LobbyOptions" style={{flex: 2}} >            
            {options}
        </View>
    );
};
  
export default LobbyOptions;
