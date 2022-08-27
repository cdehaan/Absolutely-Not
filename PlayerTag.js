import React from 'react';
import {Node} from 'react';
import { Text, View } from 'react-native';

const PlayerTag = (props): Node => {
    const myTag = props.me === true;
    const textColor = myTag ? "#BBA14F" : "#000";
    const fontWeight = myTag ? "bold" : "normal";
    return (
        <View key={props.player.playerKey} style={{ flex: 1, borderColor: "#888", borderWidth: 2, backgroundColor: "#ace"}} >
            <Text style={{fontWeight: fontWeight, color: textColor}}>{props.player.name}</Text>
        </View>
    );
};
  
export default PlayerTag;
