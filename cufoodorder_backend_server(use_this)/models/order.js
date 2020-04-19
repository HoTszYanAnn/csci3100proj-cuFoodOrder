var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var OrderSchema = new Schema({
    customer_name: {type: String},
    restaurant_name: {type: String},
    courier_name: {type: String},
    menu_name: {type: String},
    orderList: [{dish: {type: String}, amount: {type: Number, default: 0}, price: {type: Number, default: 0}}], // array for storing order
    paymentInfo: {type: String},
    orderStatus: {type: Number, default: 0},
    remarks: {type: String}
}, {timestamps: true});
 
 
module.exports = mongoose.model('Order', OrderSchema);