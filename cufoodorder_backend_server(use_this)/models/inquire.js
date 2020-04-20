var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var InquireSchema = new Schema({
    user: {type: String},
    cs: {type: String},
    answered_by: {type: String},
    dialog: {type: String}
}, {timestamps: true});


module.exports = mongoose.model('Inquire', InquireSchema);