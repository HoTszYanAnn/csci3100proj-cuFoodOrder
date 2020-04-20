var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var cors = require("cors");


var Inquire = require('./models/inquire');
var {addCustomer, quitCustomer, infoCustomer} = require('./middlewares/chat');


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
app.use(cors({
    "origin": "http://localhost:3001",
    "credentials": true
  }));


//routing functions
app.use('/catalog/customers', require('./routes/customers'));
app.use('/catalog/inquires', require('./routes/inquires'));
app.use('/catalog/orders', require('./routes/orders'));
app.use('/catalog/menus', require('./routes/menus'));


//routing for websocket io -- i.e. communication between the server and client
//when websocket connection built, the first "on" function uses a "connection" event firing the anonymous function
io.on("connection", function(socket){


    socket.on('userinfo', ({customer_name, cs_room})=>{
        var customer = addCustomer({ connection_id: socket.id, customer_name: customer_name, cs_room});

        socket.join(customer.cs_room);

        io.to(customer.cs_room).emit('message', {
            dialog: `${customer.name}, ${customer.cs_room} is at your service.`,
            connection_id: customer.customer.connection_id,
            customer_name: customer.customer_name,
            cs_room: customer.cs_room
        });
    });


    //below on() receiving information from the client server
    socket.on("chat_dialog", function(message){
        
        var customer = infoCustomer(socket.id);
        
        var inquire = new Inquire({
            user: customer.customer_name,
            cs: message.customer_name,
            answered_by: message.answered_by,
            dialog: message.dialog
        });

        //save the dialog into the database
        inquire.save(function(err, inquireData){
            if(err) 
                return res.json({process: "failed", err});
            
            //we need to use the "inquireData" in this function scope
            Inquire.find({_id: inquireData._id}, (function(err, inquireData){
                if(err)
                    return res.json({process: "failed", err});
                else {
                //use emit() to send inquireData to the client server for further rendering
                    return io.to(customer.cs_room).emit("saved_dialog", inquireData)
                }
            }));
        });
    });


    // event listener to disconnection
    socket.on('disconnect', ()=> {
        var customer = quitCustomer(socket.id);

        io.to(customer.cs_room).emit('message', { dialog: `${customer.name} has left.` });
    });
});


//express and socket.io share the same port
//we have to listen to the specific port of process.env
server.listen(process.env.PORT || 3000);

