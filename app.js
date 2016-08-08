'use strict'

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('./pages/index.html');
});

app.get('/device', function(req, res){
    res.sendfile('./pages/device.html');
});

app.get('/static/:file', function(req, res){
    res.sendfile('./static/' + req.params.file);
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('device message', function(msg) {
        io.emit('message motion' + msg.id, msg);
    });

    socket.on('rebuild message', function(msg) {
        io.emit('message rebuild' + msg.id, msg);
    });
});

http.listen(3000, function(){
    console.log('listening on http://127.0.0.1:8087');
});