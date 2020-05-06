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

app.get('/Chat1', function (req,res) { res.sendFile('/Chat1.html', {root: __dirname + '/public'}) })
app.get('/Chat2', function (req,res) { res.sendFile('/Chat2.html', {root: __dirname + '/public'}) })
app.get('/Chat3', function (req,res) { res.sendFile('/Chat3.html', {root: __dirname + '/public'}) })
app.get('/Chat4', function (req,res) { res.sendFile('/Chat4.html', {root: __dirname + '/public'}) })



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

