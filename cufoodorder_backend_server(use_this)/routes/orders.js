var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Menu = require('../models/menu');
var Customer = require('../models/customer');
var CartDishes = require('../models/cartdishes');


// create a new order
router.post('/newOrder', function(req, res){
    var order = new Order({
        order: req.body.order,
        name: req.body.name,
        address: req.body.address,
        paymentinfo: req.body.paymentinfo,
        paymentStatus: req.body.paymentStatus,
    });

    order.save().then(order => {
        CartDishes.remove({"customer": req.body.customer}) // remove dishes from the cart
        .exec().then(doc => {
            res.json({process: "success"});
        })
        .catch(error => {
            res.json({process: "failed"});
        })
    })
    .catch(error => {
        res.json({process: "failed"});
    })

})




module.exports = router;