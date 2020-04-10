var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var server = require("http").createServer(app);
var io = require("socket.io")(server);


// var Inquire = require('./models/inquire');


//mongoose connection info. with MongoDB Altas
mongoose.connect('mongodb+srv://csci3100:projwebb@cluster0-exfag.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true}) 
    .then(function(){ console.log('~connected with the database'); })
    .catch(function(err){ console.error(err); });


//read the json data in body   
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


//routing functions
/**customers 
 * authorized cookies checking middlewares
 * registration function
 * login function
 * logout function */
app.use('/catalog/customers', require('./routes/customers'));


// io.on("connection", function(socket){
//     socket.on("chat_dialog", function(message){
//         connect.then(function(database) {
//             try {
//                 let inquire = new Inquire({
//                     user_id: message.user,
//                     cs_id: message.cs,
//                     accessRight: message.answeringPerson,
//                     dialog: message.Dialog
//                 })

//                 inquire.save(function(err, inquireData){
//                     if(err) 
//                         return res.json({process: "failed", err});
                        
//                     Inquire.find({"_id": inquireData._id}).populate("user_id").exec(function(err, inquireData){return io.emit("saved_dialog", inquireData)})
//                 });
//             } catch(error){
//                 console.error(error);
//             }
//         })
//     })
// })


app.listen(3000);
server.listen(3001);
