var express = require('express');
var router = express.Router();

// Require controller modules.
var customer_controller = require('../controllers/customerController');

/// CUSTOMER ROUTES ///
// GET catalog home page.
router.get('/', customer_controller.index);

// GET request for creating a customer. NOTE This must come before routes that display customer (uses id).
router.get('/customer/create', customer_controller.customer_create_get);

// POST request for creating customer.
router.post('/customer/create', customer_controller.customer_create_post);

// GET request to delete customer.
router.get('/customer/:id/delete', customer_controller.customer_delete_get);

// POST request to delete customer.
router.post('/customer/:id/delete', customer_controller.customer_delete_post);

// GET request to update customer.
router.get('/customer/:id/update', customer_controller.customer_update_get);

// POST request to update customer.
router.post('/customer/:id/update', customer_controller.customer_update_post);

// GET request for one customer.
router.get('/customer/:id', customer_controller.customer_detail);

// GET request for list of all customer items.
router.get('/customers', customer_controller.customer_list);

// GET request for customer created order
router.get('/customer/:id/order', customer_controller.customer_order_get);

// POST request for customer created order
router.post('/customer/:id/order', customer_controller.customer_order_post);

// GET request for customer inquiry
router.get('/customer/:id/inquiry', customer_controller.customer_inquiry_get);

// POST request for customer inquiry
router.post('/customer/:id/inquiry', customer_controller.customer_inquiry_post);

// GET request for customer bill
router.get('/customer/:id/bill', customer_controller.customer_bill_get);

// POST request for customer inquiry
router.post('/customer/:id/bill', customer_controller.customer_bill_post);

module.exports = router;