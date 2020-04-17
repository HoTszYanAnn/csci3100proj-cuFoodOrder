var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    order: [
        {
            dish: {type: Schema.Types.ObjectId, ref: 'menu'},
            price : {type: Number},
            quantity: {type: Number}
        }
    ],
    name: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    paymentinfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    paymentStatus: {type: String},
    paymentCompleted: {type: Boolean, default: false}
    
});

module.exports = mongoose.model('Order', OrderSchema);