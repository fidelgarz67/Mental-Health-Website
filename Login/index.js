//create the node static server
var express = require('express')
var path = require('path')
//grab elements from the form
var parser = require('body-parser')
var mongo = require('mongodb')
var dbAddress = mongo.MongoClient.connect('mongodb://localhost:27017/Users/users', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})

var app = express()

//extract data from the request
app.use(parser.urlencoded({
    extended: false
}))

//path to the index and registration
app.use(express.static(path.resolve(__dirname, 'public')))

//create a function for when the form is submitted
app.post('/registered', function(req, res){
    
})


app.listen(2000)