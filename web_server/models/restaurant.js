var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RestaurantOwnerSchema = new Schema(
  {
    ownerId: {type: String, required: true, max: 20},
    name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, min:8, max: 20},
    address: {type: String, required: true, max: 100},
    emailAddress: {type: String}
  }
);

// Virtual for restaurant's URL
RestaurantOwnerSchema
.virtual('url')
.get(function () {
  return '/catalog/restaurant/' + this.ownerId;
});

//Export model
module.exports = mongoose.model('RestaurantOwner', RestaurantOwnerSchema);