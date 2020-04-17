var express = require('express');
var router = express.Router();
var CartDishes = require('../models/cartdishes');
var authorized = require('../middlewares/token_check'); //middleware for authentication


//add a dish in the shopping cart

router.post('/add_item', function(req, res){
    CartDishes.findOneAndUpdate({customer: req.body.customer})
    .exec()
    .then(cartdishes => {

        // if the dish is in the shopping cart
        if(cartdishes){
            var dishes = CartDishes.cart.find(dishes => dishes.dish == req.body.menu);
            let where, action, set;
            if(dishes){
                action = "$set";
                where = {"customer": req.body.customer, "cart.product": req.body.dish};
                set = "cart.$";
            }else{
                action = "$push";
                where = {"customer": req.body.customer};
                set = "cart"
            }
            // update the dish information in the database
            CartDishes.findOneAndUpdate(where, {
                [action] : {
                    [set] : {
                        dish: req.body.dish,
                        quantity: dishes ? (dishes.quantity + req.body.quantity) : req.body.quantity,
                        price: req.body.price,
                        totalPrice: dishes ? req.body.price * (req.body.quantity+ dishes.quantity) : (req.body.price * req.body.quantity)
                    }
                }
            })
            .exec()
            .then(newDishes => {
                res.json({process: "success"});
            })
            .catch(error => {
                res.json({process: "failed", err});
            });
        // if the dish is not in the shopping cart
        }else{
            var newCartDishes = new CartDishes({
                customer: req.body.customer,
                cart: [
                    {
                        dish: req.body.dish,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        totalPrice: req.body.price * req.body.quantity
                    }
                ]
            });
            newCartDishes.save().then(newDishes =>{
                res.json({process: "failed", err});
            })
            .catch(error => {
                res.json({process: "failed", err});
            });
        }
    })
    .catch(error => {
        res.json({process: "failed", err});
    });
});

router.post('/delete_item', function(req, res){
   ShoppingCart.findOneAndDelete({_id: req.body._id}, function(err, deletedCartData){
       if(err)
            return res.json({process: "failed", err});
        else
            return res.json({process: "success", deletedCartData})
   });
});

module.exports = router;