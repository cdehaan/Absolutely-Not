import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { io } from "socket.io-client";
import {NetworkInfo} from 'react-native-network-info';

function ChatStatus() {

    // state initialized
    const [chat, setChat] = useState({message: '', sid: '', time: '', rid: ''});
    const [messages, setMessages] = useState([]);

    // reference set for socketRef using useRef hook
    const socketRef = useRef();

    useEffect(() => {
        // Get Local IP
        //NetworkInfo.getIPAddress().then(ipAddress => { console.log("getIPAddress: " + ipAddress); });
        
        // Get IPv4 IP (priority: WiFi first, cellular second)
        NetworkInfo.getIPV4Address().then(ipv4Address => { console.log("getIPV4Address: " + ipv4Address); });

        // for react native applications use ip address rather than localhost
        //socketRef.current = io('http://127.0.0.1:2525');
        //socketRef.current = io('http://192.168.0.0:2525');
        socketRef.current = io('http://192.168.0.18:2525');

        // message recieved from the server and set in the state
        socketRef.current.on('connect', () => {
            console.log("client connect");
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [messages]);

    useEffect(() => {
        socketRef.current.on('message', (msg) => {
            console.log(msg);
            setMessages([...messages, msg]);
            //socketRef.current.emit('message', {message: "Still got it", sid: 191, time: new Date().toLocaleTimeString(), rid: 201});
            //socketRef.current.emit('message2', {message: "Still got it", sid: 191, time: new Date().toLocaleTimeString(), rid: 201});
            socketRef.current.emit('create game', {playerName: "Chris"});
        });

        socketRef.current.on('game created', (msg) => {
            console.log('game created:' + msg);
        });
    }, []);

    function onSubmitHandler() {
        // all objects dereferenced from the state chat
        const {message, sid, time, rid} = chat;

        // chat sent to the server
        socketRef.current.emit('message', {message, sid, time, rid});
        // state of chat cleared
        setChat({message: '', sid: '', time: '', rid: ''});
    };

    // return jsx to render UI
    return (
    <View><Text>
        There are {messages.length} chat messages.
    </Text></View>
    );

}

export default ChatStatus;