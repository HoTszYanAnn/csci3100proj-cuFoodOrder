var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var authorized = require('../middlewares/token_check'); //middleware for authentication


//authorized cookies checking middlewares
router.get('/token_check', authorized, function(req, res){
    res.status(200).json({
        _id: req._id,
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
        
    });

    return res.status(200).json({process: "success"});

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
                res.cookie("linkage_token", customer.token).status(200).json({process: "success", customerId: customer._id});
            });
        });
    });

});


// logout function below
// using get because logout function doesn't need to be that secure as login
router.get('/logout', authorized, function(req, res){
    Customer.findOneAndUpdate({_id: req.customer._id}, {token: "empty"}, function(err, doc){
        if(err)
            return res.json({process: "failed", details: err});
        return res.status(200).json({process: "success", details: "logout successfully"});
    });

});


module.exports = router;