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
}, {timestamps: true, toJSON: { virtuals: true }});

OrderSchema.virtual('findNameUnderCustname', {
    ref: 'Customer', // The model to use
    localField: 'customer_name', // Find people where `localField`
    foreignField: 'username', // is equal to `foreignField`
});

OrderSchema.virtual('findNameUnderRestname', {
    ref: 'Customer', // The model to use
    localField: 'restaurant_name', // Find people where `localField`
    foreignField: 'username', // is equal to `foreignField`
});

OrderSchema.virtual('findNameUnderCouriername', {
    ref: 'Customer', // The model to use
    localField: 'courier_name', // Find people where `localField`
    foreignField: 'username', // is equal to `foreignField`
});
 
 
module.exports = mongoose.model('Order', OrderSchema);