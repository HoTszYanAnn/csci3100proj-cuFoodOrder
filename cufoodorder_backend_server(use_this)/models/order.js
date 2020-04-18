var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
var OrderSchema = new Schema({
    customer_id: {type: Schema.Types.ObjectId, ref: "Customer"},// populate address username paymentInfo
    restaurant_id: {type: Schema.Types.ObjectId, ref:"Customer"},
    courier_id: {type: Schema.Types.ObjectId, ref: "Customer"},
    menu_id: {type: Schema.Types.ObjectId, ref: "Menu"},
    orderList: [{dish: {type: String}, amount: {type: Number, default: 0}, price: {type: Number, default: 0}}], // array for storing order
    paymentInfo: {type: String},
    orderStatus: {type: Number, default: 0},
    remarks: {type: String}
}, {timestamps: true});
 
 
module.exports = mongoose.model('Order', OrderSchema);