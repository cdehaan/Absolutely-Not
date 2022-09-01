import {Node, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React from 'react';
import { GameContext } from './App';
import PlayerTag from './PlayerTag';

const LobbyPlayers = (props): Node => {
    const playersData = useContext(GameContext).players;

    const playersAnim = props.anim;
    const playersOpacity = playersAnim.interpolate({ inputRange:[0, 1], outputRange:[0.5, 1] });

    const playerList = playersData.competitors.map(competitor => { return(<PlayerTag player={competitor}/>); });
    playerList.unshift(<PlayerTag me={true} player={playersData.me} />)

    const styles = StyleSheet.create({
        headerView: {
            opacity: playersOpacity,
            borderColor: '#b3cce6',
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: '#6699cc',
        },
        headerText: {
            fontFamily: 'DancingScript-Bold',
            alignSelf: 'center',
            color: "#fff",
        },
    });

    const numColumns = 3;

    return (
        <View style={{ flex: 1, backgroundColor:"#fdb"}} >
            <Text>Players:</Text>
            <FlatList
                data={playerList}
                renderItem={({item}) => (<View style={{flex: 1/numColumns}}>{item}</View>)}
                numColumns={numColumns}
            />
        </View>
    );
};
  
export default LobbyPlayers;
