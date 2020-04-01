#! /usr/bin/env node

console.log('This script populates some test customers to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Customer = require('./models/customer')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var customers = [] 

function customerCreate(customerId, name, username, password, address, mobile, emailAddress, paymentInfo,cb) {
  customerdetail = {customerId: customerId, 
                    name: name,
                    username: username,
                    password: password,
                    address: address,
                    mobile: mobile,
                    emailAddress: emailAddress,
                    paymentInfo: paymentInfo 
    }
  
  var customer = new Customer(customerdetail);
       
  customer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Customer: ' + customer);
    customers.push(customer)
    cb(null, customer)
  }  );
}

function createCustomers(cb) {
    async.series([
        function(callback) {
          customerCreate('cust0001', 'fred', 'fredwong', 'wongfred', 'elb', 61111111, 'fredwong@yahoo.com.hk', 'visa1111222233334441', callback);
        },
        function(callback) {
          customerCreate('cust0002', 'ann', 'annwong', 'wongann', 'mmw', 61111112, 'annwong@yahoo.com.hk', 'visa1111222233334442', callback);
        },
        function(callback) {
          customerCreate('cust0003', 'barry', 'barrywong', 'wongbarry', 61111113, 'barrywong@yahoo.com.hk', 'visa1111222233334443', callback);
        }
        ],
        // optional callback
        cb);
}

async.series([
    createCustomers
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Customers: '+customers);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
