import React from 'react';
import {Node} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlayerTag = (props): Node => {
    const myTag = props.me === true;
    const textColor = myTag ? "#BBA14F" : "#000";
    const fontWeight = myTag ? "bold" : "normal";

    const styles = StyleSheet.create({
        tagView: {
            flex: 1,
            borderColor: "#888",
            borderWidth: 2,
            backgroundColor: "#ace"
        },
        tagText: {
            fontWeight: fontWeight,
            color: textColor
        }
    });

    return (
        <View key={props.player.playerKey} style={styles.tagView} >
            <Text style={styles.tagText}>{props.player.name}</Text>
        </View>
    );
};
  
export default PlayerTag;
