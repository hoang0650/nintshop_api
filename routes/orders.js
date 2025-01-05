var express = require('express');
var router = express.Router();
const { isAdmin, isShopOwner } = require('../middleware/auth.js');
const { createOrder,getAllOrderUsers, getAllOrderShops,getOrder,updateOrderStatus } = require('../controllers/orders');

// Create a new order (authenticated users only)
router.post('/', isAdmin, createOrder);

// Get all orders for a user
router.get('/user', isAdmin, getAllOrderUsers);

// Get all orders for a shop (shop owner only)
router.get('/shop', isShopOwner, getAllOrderShops);

// Get a specific order
router.get('/:id', isAdmin, getOrder);

// Update order status (shop owner only)
router.put('/:id/status', isShopOwner, updateOrderStatus);

module.exports = router;