var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BillSchema = new Schema(
  {
    billId: {type: String, required: true, max: 20},
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    orderId: {type: Schema.Types.ObjectId, ref: 'Order', required: true},
    price: {type: Number},
    status: {type: String}
  }
);

// Virtual for bill's URL
BillSchema
.virtual('url')
.get(function () {
  return '/catalog/bill/' + this.billId;
});

//Export model
module.exports = mongoose.model('Bill', BillSchema);