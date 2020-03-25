var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InquireSchema = new Schema(
  {
    inquiryId: {type: String, required: true, max: 20},
    customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
    csId: {type: Schema.Types.ObjectId, ref: 'Cs', required: true},
    chatList: {type: String, required: true, max: 10000},
    createTime: {type: Date, required: true}
  }
);

// Virtual for inquire's URL
InquireSchema
.virtual('url')
.get(function () {
  return '/catalog/inquire/' + this.inquiryId;
});

//Export model
module.exports = mongoose.model('Inquire', InquireSchema);