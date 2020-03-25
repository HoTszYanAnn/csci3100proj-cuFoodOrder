var Customer = require('../models/customer');

// Display list of all customers.
exports.customer_list = function(req, res) {
    res.send('NOT IMPLEMENTED: customer list');
};

// Display detail page for a specific customer.
exports.customer_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: customer detail: ' + req.params.id);
};

// Display customer create form on GET.
exports.customer_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customer create GET');
};

// Handle customer create on POST.
exports.customer_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customer create POST');
};

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