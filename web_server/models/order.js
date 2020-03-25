var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    orderId: {type: String, required: true, max: 20},
    orderList: {type: String, required: true, max: 300},
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer',required: true},
    restaurantId: {type: Schema.Types.ObjectId, ref: 'RestaurantOwner',required: true},
    courierId: {type: Schema.Types.ObjectId, ref: 'Courier',required: true},
    orderTime: {type: Date, required: true},
    orderStatus: {type: String, required: true}
  }
);

// Virtual for order's URL
OrderSchema
.virtual('url')
.get(function () {
  return '/catalog/order/' + this.orderId;
});

//Export model
module.exports = mongoose.model('Order', OrderSchema);