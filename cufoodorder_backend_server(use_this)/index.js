var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var cors = require("cors");


var Inquire = require('./models/inquire');


//mongoose connection info. with MongoDB Altas
mongoose.connect('mongodb+srv://csci3100:projwebb@cluster0-exfag.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true}) 
    .then(function(){ console.log('~connected with the database'); })
    .catch(function(err){ console.error(err); });


//read the json data in body  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


//use cors for frontend access
app.use(cors());


//routing functions
/**customers 
 * authorized cookies checking middlewares
 * registration function
 * login function
 * logout function */
app.use('/catalog/customers', require('./routes/customers'));
/**inquires
 * getChatHistory */
app.use('/catalog/inquires', require('./routes/inquires'));
/**orders
 * createBill function
 * displayOrder
 * total price
 * update delivery information
 * search courier */
app.use('/catalog/orders', require('./routes/orders'));
/**menus
 * receive uploaded photos of the menu from the server
 */
app.use('/catalog/menus', require('./routes/menus'));
// var fs = require('fs');
// app.get('/form', function(req, res, next){
//     var form = fs.readFileSync('./upload_test.html', {encoding: 'utf8'});
//     res.send(form);
// });


// app.get('/chat', function(req, res){
//     res.sendFile(__dirname + '/chat_app.html');
// });

//routing for websocket io -- i.e. communication between the server and client
//when websocket connection built, the first "on" function uses a "connection" event firing the anonymous function
io.on("connection", function(socket){

    console.log('a user connected' + socket.id); //debug

    //below on() receiving information from the client server
    socket.on("chat_dialog", function(message){
        
        console.log(message);  //debug 
        
        var inquire = new Inquire({
            user_id: message.user_input_id,
            cs_id: message.cs_input_id,
            accessRight: message.answeringPerson,
            dialog: message.Dialog
        });

        //save the dialog into the database
        inquire.save(function(err, inquireData){
            if(err) 
                return res.json({process: "failed", err});
            
            //we need to use the "inquireData" in this function scope
            Inquire.find({_id: inquireData._id})
            .populate("user_id", 'username')
            .populate("cs_id", 'username')
            .exec(function(err, inquireData){
                if(err)
                    return res.json({process: "failed", err});
                else {
                console.log(inquireData);
                //use emit() to send inquireData to the client server for further rendering
                return io.emit("saved_dialog", inquireData)}})
        });
    });
});


//express and socket.io share the same port
server.listen(3000);

