var express = require('express');
var socket = require('socket.io');      //socket on the server

//Application set-up
var app = express();

//Create a server
var server = app.listen(4000, function(){
    console.log('Listening to request on PORT 4000');    
});

//static files for the server to 'see'
app.use(express.static('public'));


//Socket Setup
var io = socket(server);

//listen for a connection
io.on('connection', function(socket){
    console.log('Made a socket connection', socket.id);

    //listen to the message
    socket.on('chat', function(data){
        //send this message to everyone thats connected to the chat
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });
});

