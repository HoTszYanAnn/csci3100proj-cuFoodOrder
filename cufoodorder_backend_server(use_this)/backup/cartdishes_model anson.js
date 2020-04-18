var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CartDishesSchema = new Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    cart: [
        {
            dish: {type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
            quantity: {type: Number, default: 1},
            price: {type: Number},
            totalPrice: {type: Number}
        }
    ],

});

module.exports = mongoose.model('CartDishes', CartDishesSchema);