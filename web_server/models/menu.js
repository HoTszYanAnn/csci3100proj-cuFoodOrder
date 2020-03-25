var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MenuSchema = new Schema(
  {
    restaurantId: {type: String, required: true, max: 20},
    menuList: {type: String, required: true, max: 10000}
  }
);

// Virtual for menu's URL
MenuSchema
.virtual('url')
.get(function () {
  return '/catalog/menu/' + this.restaurantId;
});

//Export model
module.exports = mongoose.model('Menu', MenuSchema);