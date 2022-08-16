const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {pingTimeout: 60000});

app.use(express.static('public'));
app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
http.listen(2525, () => { console.log('listening on *:2525'); });
