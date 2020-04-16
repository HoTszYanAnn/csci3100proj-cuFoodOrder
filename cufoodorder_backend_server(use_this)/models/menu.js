var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    restaurantName: {type: Schema.Types.ObjectId, ref:'Customer'},
    menuName: {type: String},
    menuList: [{dish: String, description: String, price: {type: Number, default: 0}, imageAddress: String}],
    likes: {type: Number}
},{timestamps: true});

module.exports = mongoose.model('Menu', MenuSchema);