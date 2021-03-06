var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var authorized = require('../middlewares/token_check'); //middleware for authentication
 
 
//create-bill function
router.post('/createBill', authorized, function(req, res){
    var orderList = new Order(req.body);
 
    orderList.save(function(err, orderData){
        if(err) 
            return res.json({process: "failed", err}); 
        else {
            return res.status(200).json({process: "success", orderData});
            };        
        });
});

//findOneOrderById
router.post('/find_order_by_id', authorized, function(req, res){
    Order.findOne({_id: req.body.id}).exec(function(err, orderDetails){
        if(err)
            return res.json({process: "failed", err});
        else    
            return res.json({process: "success", orderDetails});
    });
});
 
// display-order History function for customer
router.post('/orderHistory_customer', authorized, function(req, res){
    Order.find({customer_name: req.body.custname})
    .sort('-createdAt')
    .populate('findNameUnderCustname', 'name mobile address')
    .populate('findNameUnderRestname', 'name mobile address')
    .populate('findNameUnderCouriername', 'name mobile address')
    .exec(function(err, orderHistory){
        if(err)
            return res.json({process: "failed", err});
        else    
            return res.json({process: "success", orderHistory});
    });
});


// display-order History function for restaurant
router.post('/orderHistory_restaurant', authorized, function(req, res){
    Order.find({restaurant_name: req.body.restname})
    .sort('-createdAt')
    .populate('findNameUnderCustname', 'name mobile address')
    .populate('findNameUnderRestname', 'name mobile address')
    .populate('findNameUnderCouriername', 'name mobile address')
    .exec(function(err, orderHistory){
        if(err)
            return res.json({process: "failed", err});
        else    
            return res.json({process: "success", orderHistory});
    });
});


// display-order History function for courier
router.post('/orderHistory_courier', authorized, function(req, res){
    Order.find({courier_name: req.body.couriername})
    .sort('-createdAt')
    .populate('findNameUnderCustname', 'name mobile address')
    .populate('findNameUnderRestname', 'name mobile address')
    .populate('findNameUnderCouriername', 'name mobile address')
    .exec(function(err, orderHistory){
        if(err)
            return res.json({process: "failed", err});
        else    
            return res.json({process: "success", orderHistory});
    });
});
 

//update order
//can update the order through the Order._id
router.post('/update_order', authorized, function(req, res){
 
    var updateKeysAndValues = {};
 
    //below function used to assign keys and values to the object
    //first parameter is target; second one is the source for copy
    Object.assign(updateKeysAndValues, req.body);
 
    Order.findOneAndUpdate({_id: req.body._id}, updateKeysAndValues, function(err, beforeUpdateOrderData){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", beforeUpdateOrderData, newChange: req.body});
    });
});
 
 
//cancel order
router.post('/delete_order', authorized, function(req, res){
    Order.findOneAndDelete({_id: req.body._id}, function(err, deletedOrderData){
        if(err)
            return res.json({process: "failed", err});
        else 
            return res.json({process: "success", deletedOrderData});
    });
});
 
 
// "courier_match" is used to see if the courier's id appeared in the order's database
// in other words, courier's data should be unique in here
router.post('/courier_match', authorized, function(req, res){
    Order.findOne({courier_name: req.body.couriername}, function(err, doc){
        if(err)
            return res.json({process: "failed", err});
        else if(!doc)
            return res.json({process: "success", details: "the courier is able"});
        else{
            return res.json({process: "failed", details: "the courier is occupied"});
            };
    });
});

//a
router.post('/empty_courier', authorized, function(req, res){
    Order.find({"$or": [{courier_name: null},{courier_name: ''}]})
    .populate('findNameUnderCustname', 'name mobile address')
    .populate('findNameUnderRestname', 'name mobile address')
    .exec(function(err, doc){
        if(err)
            return res.json({process: "failed", err});
        else if(!doc)
            return res.json({process: "failed", details: "all list occupied"});
        else{
            return res.json({process: "success", doc});
            };
    });
});
 
 
module.exports = router;
