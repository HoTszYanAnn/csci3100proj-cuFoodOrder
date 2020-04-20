var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var authorized = require('../middlewares/token_check'); //middleware for authentication



//authorized cookies checking middlewares
router.post('/token_check', authorized, function(req, res){
    res.status(200).json({
        _id: req.customer._id,
        username: req.customer.username,
        accessRight: req.customer.accessRight,
        authorization: true
    });
});


//registration function
router.post('/register', function(req, res){
    var customer = new Customer(req.body);

    customer.save(function(err, customerData){
        if(err) 
            return res.json({process: "failed", err});
        else
            return res.status(200).json({process: "success"});       
    });

});


//login function
router.post('/login', function(req, res){
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
                res.cookie("linkage_token", customer.token).status(200).json({
                    process: "success", 
                    customerId: customer._id,
                    username: customer.username,
                    accessRight: customer.accessRight,
                    name: customer.name
                });
            });
        });
    });

});


// logout function below
// using get because logout function doesn't need to be that secure as login
// Customer.findOneAndUpdate({_id: req.customer._id}, {token: "empty"}, function(err, doc){
router.post('/logout', authorized, function(req, res){
    Customer.findOneAndUpdate({_id: req.customer._id}, {token: "empty"}, function(err, doc){
        if(err)
            return res.json({process: "failed", details: err});
        else if(!doc)
            return res.json({process: "failed", details: 'document not found in database'});
        else
            return res.status(200).json({process: "success", details: "logout successfully"});
    });
});


// search function below
// see if there is any existed username in the database, if so, return warning
router.post('/username_match', function(req, res){
    Customer.findOne({username: req.body.username}, function(err, doc){
        if(err)
            return res.json({process: "failed", err});
        else if(!doc)
            return res.json({process: "success", details: "username can be used"});
        else{
            return res.json({process: "failed", details: "username existed in the database"});}
    });
});


// post all the menus under this username.
router.post('/username_menu', function(req, res){
    Customer.find({username: req.body.username}).populate('findMenuUnderUsername', 'menuName').select('username').exec(function(err, doc){
        if(err)
            return res.json({process: "failed", err});
        else{
            return res.json({process: "success", doc});}
    });
});


//update account
router.post('/update_account', authorized, function(req, res){

    var updateKeysAndValues = {};

    //below function used to assign keys and values to the object
    //first parameter is target; second one is the source for copy
    Object.assign(updateKeysAndValues, req.body);

    // console.log(updateKeysAndValues); //debug

    Customer.findOne({_id: req.customer._id}, function(err, beforeUpdateData){
        if(err)
            return res.json({process: "failed", err});
        else if (!beforeUpdateData)
            return res.json({process: "failed", details: "document not existed in the database"});
        else {
            for(var id in req.body) {
                beforeUpdateData[id] = req.body[id];                
            }
            beforeUpdateData.save((err, afterUpdate)=>{
                return res.json({process: "success", afterUpdate});
            });
        }
    });
});


//request all data of that user by username
router.post('/user_data', authorized, function(req, res){

    Customer.findOne({_id: req.customer._id}, function(err, customerData){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", customerData});
    });
});

module.exports = router;