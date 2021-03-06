//load the enviorment variables that arent visable (secret word for encryption)

// LogIn / Register Code
if(process.env.node_env !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const overRide = require('method-override')
const initialPassport = require('./passportConfig')
var path = require('path')
var socket = require('socket.io');      //socket for chat

//allow for passport to verify 
initialPassport(
    passport, 
    //find the email and user id in the database (users array)
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

//users will be stored into an array (needs to be moved into a dataset)
const users = []

//let the server know of any paths, and or files that are needed
app.set('view-engine', 'ejs')
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'SessionPageSubscription')));
app.use(express.static(path.join(__dirname, 'public')));


//get individual aspects of the form to use in the POST method
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    //provide a key (all our user data is safe, per session)
    secret:process.env.session_secret,
    resave: false,                  
    saveUninitialized: false
}))

app.use(passport.initialize())  //initialize the users
app.use(passport.session())     //keep users persistent
app.use(overRide('_method'))    //used for loggin out

//create a path for logging out (still need to add to the main)
app.get('/', (req, res) =>{
    //Go to the home page once signed in
    res.render('index.ejs', {name: req.user.name})
})

//Log-In 
app.get('/login', (req, res) =>{
    res.render('login.ejs')
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/SessionPage/public/selection.html',
    failureRedirect: '/login',
    failureFlash: true              //show error message
}))

//Register
app.get('/register', (req, res) =>{
    res.render('register.ejs')
})

app.post('/register', async (req, res)=>{
    //try to create a user (this needs to moved into a dataset)
    try {
        users.push({
            id:Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 5)
        })
        //if it worked go back to the login screen
        res.redirect('/login')
    } catch {
        //any errors - send back to reregister
        res.redirect('/register')
    }
    //print all the users 
    console.log(users);
    
})

//LogOut - Using passport function
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Chat Room Code
//Create a server
var server = app.listen(2000, function(){
    console.log('Listening to request on PORT 2000');    
});

//static files for the server to 'see'
app.use(express.static('/SessionPageSubscription/SessionPage/public'));

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