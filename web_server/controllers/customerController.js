var Customer = require('../models/customer');
var Bill = require('../models/bill');
var Courier = require('../models/courier');
var Cs = require('../models/cs');
var Inquire = require('../models/inquire');
var Menu = require('../models/menu');
var Order = require('../models/order');
var Restaurant = require('../models/restaurant');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        customer_count: function(callback) {
            Customer.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        bill_count: function(callback) {
            Bill.count({}, callback);
        },
        courier_count: function(callback) {
            Courier.count({}, callback);
        },
        cs_count: function(callback) {
            Cs.count({}, callback);
        }
        // to be continue...
        //
        //
        //
        //
    }, function(err, results) {
        res.render('index', { title: 'CuFoodOrder Home', error: err, data: results });
    });
};

// Display list of all customers.
exports.customer_list = function(req, res, next) {

    Customer.find({}, 'customerId name')
    .populate('name')
    .exec(function (err, list_customers) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('customer_list', { title: 'Customer List', customer_list: list_customers });
    });

};

// Display detail page for a specific customer.
exports.customer_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: customer detail: ' + req.params.id);
};

// Display customer create form on GET.
exports.customer_create_get = function(req, res, next) {
    res.render('customer_form', { title: 'Create Customer' });
};

// Handle customer create on POST.
exports.customer_create_post = [
   
    // Validate that the customer field is not empty.
    body('name', 'Customer name required').isLength({ min: 1 }).trim(),
    body('username', 'Customer username required').isLength({ min: 1 }).trim(),
    body('password', 'Customer password required').isLength({ min: 8 }).trim(),
    body('address', 'Customer address required').isLength({ min: 1 }).trim(),

    
    // Sanitize (trim and escape) the customer field.
    sanitizeBody('name').trim().escape(),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
    sanitizeBody('address').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        let customer_count;
        let cust_string;
        Customer.count({}, function(err, count){ customer_count = count+1; cust_string = 'cust' + customer_count });

        // Create a customer object with escaped and trimmed data.
        var customer = new Customer(
          { 
            customerId: cust_string,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            mobile: req.body.mobile,
            emailAddress: req.body.emailAddress,
            paymentInfo: req.body.paymentInfo
            }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('customer_form', { title: 'Create Customer', customer: customer, errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid.
            // Check if Customer with same name already exists.
            Customer.findOne({ 'name': req.body.name })
                .exec( function(err, found_customer) {
                     if (err) { return next(err); }

                     if (found_customer) {
                         // Customer exists, redirect to its detail page.
                         res.redirect(found_customer.url);
                     }
                     else {

                         customer.save(function (err) {
                           if (err) { return next(err); }
                           // Customer saved. Redirect to customer detail page.
                           res.redirect(customer.url);
                         });

                     }

                 });
        }
    }
];

// Display customer delete form on GET.
exports.customer_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer delete GET');
};

// Handle customer delete on POST.
exports.customer_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer delete POST');
};

// Display customer update form on GET.
exports.customer_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer update GET');
};

// Handle customer update on POST.
exports.customer_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer update POST');
};

// Display customer created order on GET
exports.customer_order_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer order GET');
};

// Handle customer created order on POST.
exports.customer_order_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer order POST');
};

// Display customer inquiry on GET
exports.customer_inquiry_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer inquiry GET');
};

// Handle customer inquiry on POST.
exports.customer_inquiry_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer inquiry POST');
};

// Display customer bill on GET
exports.customer_bill_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer bill GET');
};

// Handle customer bill on POST
exports.customer_bill_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer bill POST');
};