var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var Customer = require('./models/customer'); // modified
var authorized = require('./middlewares/token_check'); //middleware for authentication

mongoose.connect('mongodb+srv://csci3100:projwebb@cluster0-exfag.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true}) 
    .then(function(){ console.log('~connected with the database'); })
    .catch(function(err){ console.error(err); });


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/catalog/customers/token_check', authorized, function(req, res){
    res.status(200).json({
        _id: req._id,
        username: req.customer.username,
        accessRight: req.customer.accessRight,
        authorization: true
    });
});


app.post('/catalog/customers/register', function(req, res){
    var customer = new Customer(req.body);

    customer.save(function(err, customerData){
        if(err) 
            return res.json({process: "failed", err});
        
    });

    return res.status(200).json({process: "success"});

});

app.post('/catalog/customers/login', function(req, res){
    Customer.findOne({username: req.body.username}, function(err, customer){
        if(!customer)
            return res.json({process: "failed", details: "username not found!"});

        //input_password compared with the hashed password in the database
        customer.password_match(req.body.password, function(err, match_status){
            if (!match_status)
                return res.json({ process: "failed", details: "incorrect password" });

            //tokens for cookie session
            customer.token_create(function(err, customer){
                if (err) 
                    return res.status(400).send(err);
                // res.cookie("linkage_expiry", customer.token_expiry);
                res.cookie("linkage_token", customer.token).status(200).json({process: "success", customerId: customer._id});
            });
        });
    });

});


app.listen(3000);
