var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
  {
    customerId: {type: String, required: true, max: 10},
    name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, min:8, max: 20},
    address: {type: String, required: true, max: 100},
    mobile: {type: Number},
    emailAddress: {type: String},
    paymentInfo: {type: String},
  }
);

// Virtual for customer's name
CustomerSchema
.virtual('customerName')
.get(function () {
  return this.name;
});

// Virtual for customer's URL
CustomerSchema
.virtual('url')
.get(function () {
  return '/catalog/customer/' + this.customerId;
});

//Export model
module.exports = mongoose.model('Customer', CustomerSchema);