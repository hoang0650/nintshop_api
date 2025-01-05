var express = require('express');
var router = express.Router();
const { isAdmin, isShopOwner } = require('../middleware/auth.js');
const { createShop, getAllShops, getShop, updateShop, deleteShop, addEmployee, getAllEmployees } = require('../controllers/shops.js');
// Create a new shop (admin only)
router.post('/', isAdmin, createShop);

// Get all shops (admin only)
router.get('/', isAdmin, getAllShops);

// Get a specific shop
router.get('/:id', getShop);

// Update a shop (shop owner only)
router.put('/:id', isShopOwner, updateShop);

// Delete a shop (admin only)
router.delete('/:id', isAdmin, deleteShop);

// Add an employee to a shop (shop owner only)
router.post('/:id/employees', isShopOwner, addEmployee);

// Get all employees of a shop (shop owner only)
router.get('/:id/employees', isShopOwner, getAllEmployees);

module.exports = router;