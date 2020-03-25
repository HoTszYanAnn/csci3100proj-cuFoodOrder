var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CsSchema = new Schema(
  {
    csId: {type: String, required: true, max: 10},
    name: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, min:8, max: 20},
    emailAddress: {type: String}
  }
);

// Virtual for cs's URL
CsSchema
.virtual('url')
.get(function () {
  return '/catalog/cs/' + this.csId;
});

//Export model
module.exports = mongoose.model('Cs', CsSchema);