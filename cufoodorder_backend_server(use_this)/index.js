var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var cors = require("cors");


var Inquire = require('./models/inquire');
let {addCustomer, quitCustomer, infoCustomer, addcs, infocs} = require('./middlewares/chat'); //store chatroom status and information


//mongoose connection info. with MongoDB Altas
mongoose.connect('mongodb+srv://csci3100:projwebb@cluster0-exfag.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true}) 
    .then(function(){ console.log('~connected with the database'); })
    .catch(function(err){ console.error(err); });


//read the json data in body  
app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());


//use cors for frontend access
app.use(cors({
    // "origin": ["http://localhost:3001", "http://localhost:30"],
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
//debug line

    socket.on('userinfo', ({customer_room})=>{
        let customer = addCustomer({ connection_id: socket.id, customer_room: customer_room});

        console.log(customer);

        socket.join(customer.customer_room);

        io.to(customer.customer_room).emit('join_cust', {
            dialog: `customer ${customer.customer_room} is in room.`,
            connection_id: customer.connection_id,
            customer_room: customer.customer_room
        });
    });


    socket.on('csinfo', ({cs_name, customer_room})=>{
        let customer = addcs({connection_id: socket.id, cs_name: cs_name, customer_room: customer_room});

        console.log(customer);

        socket.join(customer.customer_room);

        io.to(customer.customer_room).emit('join_cs', {
            dialog: `${customer.customer_room}, ${customer.username} is at your service.`,
            connection_id: customer.connection_id,
            cs_name: customer.username,
            customer_room: customer.customer_room
        });
    });


    //below on() receiving information from the client server
    socket.on("chat_dialog", function(message){

        let connection_id = socket.id;

        console.log(connection_id);
        
        let customer = infoCustomer(connection_id);

        console.log("debud "+ customer)
        //message = {author, type, data{text}}

        var cs_name = infocs(customer.customer_room)
        // console.log(cs_name.username);

        if(cs_name===undefined){
            var cs_name = {username: ''};
        }
        


        // let inquire = new Inquire({
        //     user: customer.customer_room,
        //     cs: customer.cs_name,
        //     answered_by: message.author,
        //     dialog: message.data.text
        // });

        let inquire = new Inquire({
            user: customer.customer_room,
            cs: cs_name.username,
            answered_by: message.author,
            dialog: message.data.text
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
                    return io.to(customer.customer_room).emit("saved_dialog", message);
                }
            }));
        });
    });


    // event listener to disconnection
    socket.on('exit', ()=> {
        let customer = quitCustomer(socket.id);
        console.log(customer);
        if(customer){
            io.to(customer.customer_room).emit('exit_message', { dialog: `user has left.` });
        }
    });
});

//new branch testing


//express and socket.io share the same port
//we have to listen to the specific port of process.env
server.listen(process.env.PORT || 3000);

