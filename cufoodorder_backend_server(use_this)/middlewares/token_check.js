/** this part is token_check middleware*/
var Customer = require('../models/customer');

let token_check = function(req, res, next){

    let token = req.cookies.linkage_token;

    Customer.searchToken(token, function(err, customer){
        if(err)
            throw err;
        if(!customer) //cannot find the customer in our database, given the input token
            return res.json({process: "failed", details:"not authorized"});
        
        req.token = token;
        req.customer = customer;
        next();
    });

};

module.exports = token_check;