var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jsonwebtoken = require("jsonwebtoken");

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: {type: String, max: 50},
    username: {type: String, max: 20},
    password: {type:String, min:8, max:20},
    introduction: {type: String},
    address: {type: String},
    mobile: {type: String},
    emailAddress: {type: String},
    paymentInfo: {type: String},
    accessRight: {type: Number, default: 0},
    token: {type: String},
    image: {type: String},
    likes: {type: Number}
    },{toJSON: { virtuals: true }
});

// the below part hashing the password before saving data into database
// using the module bcrypt
var saltRounds = 10; //brute-forcing hashing difficulty
CustomerSchema.pre('save', function(next){
    var customer = this;

    if(customer.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err)
                return next(err);

            bcrypt.hash(customer.password, salt, function(err, hashed_password){
                if(err)
                    return next(err);
                customer.password = hashed_password;
                next();        
            });
        });
    }
    else {
        next();
    };
});

//matching hashed password with the input_password
CustomerSchema.methods.password_match = function(input_password, callback){
    bcrypt.compare(input_password, this.password, function(err, match_status){
        if (err) 
            return callback(err);
        callback(null, match_status);
    });
};

//token creating function
CustomerSchema.methods.token_create = function(callback){
    var customer = this;
    //_id is mongoDB id for a schema
    var token = jsonwebtoken.sign(customer._id.toHexString(), 'secret')
    // var oneHour = moment().add(1, 'hour').valueOf();

    // customer.token_expiry = oneHour;
    customer.token = token;
    customer.save(function (err, customer){
        if (err) 
            return callback(err);
        callback(null, customer);
    });
};

//verify whether the customer's token is true
//decoded token is the _id in mongoDb database
CustomerSchema.statics.searchToken = function(token, callback){
    var customer= this;

    jsonwebtoken.verify(token, 'secret', function(err, decoded_id){
        customer.findOne({'_id': decoded_id, "token": token}, function(err, customer){
            if(err)
                return callback(err);
            callback(null, customer);
        });
    });

};


//virtual populate get the 'menuName' through query of 'username' in this model
CustomerSchema.virtual('findMenuUnderUsername', {
    ref: 'Menu', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'restaurantName', // is equal to `foreignField`
});


module.exports = mongoose.model('Customer', CustomerSchema);