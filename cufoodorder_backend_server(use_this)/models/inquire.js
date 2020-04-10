var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var InquireSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "Customer"},
    cs_id: {type: Schema.Types.ObjectId, ref: "Customer"},
    accessRight: {type: Number, default: 0},
    dialog: {type: String}
}, {timestamps: true});


module.exports = mongoose.model('Inquire', InquireSchema);