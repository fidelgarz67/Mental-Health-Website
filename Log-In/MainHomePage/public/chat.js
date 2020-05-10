//establish the connection 
var socket = io.connect('http://localhost:2000/');

//query the DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//emit Event
btn.addEventListener('click', function(){
    //send the information to the server
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

//add an event listener for when someone starts typing
message.addEventListener('keypress', function(){
    //send a typing signal with the persons handle(name)
    socket.emit('typing', handle.value);
});


//Listen for events from the server 
socket.on('chat', function(data){
    //reset the diplay portion to be empty after a message is sent
    feedback.innerHTML = '';
    //display the handle and message once sent
    output.innerHTML += '<p> <strong>' + data.handle + 
                        ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML += '<p> <em>' + data + 
                          ' is typing a message... </em> </p>'
});