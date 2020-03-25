var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourierSchema = new Schema(
  {
    courierId: {type: String, required: true, max: 20},
    name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, min:8, max: 20},
    address: {type: String, required: true, max: 100},
    mobile: {type: Number},
    emailAddress: {type: String},
    status: {type: String, required: true}
  }
);

// Virtual for courier's URL
CourierSchema
.virtual('url')
.get(function () {
  return '/catalog/courier/' + this.courierId;
});

//Export model
module.exports = mongoose.model('Courier', CourierSchema);