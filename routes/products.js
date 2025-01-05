var express = require('express');
var router = express.Router();
const { isShopOwner } = require('../middleware/auth.js');
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
// Create a new product (shop owner only)
router.post('/', isShopOwner, createProduct);
  
// Get all products
router.get('/', getAllProducts);
  
// Get a specific product
router.get('/:id', getProduct);
  
// Update a product (shop owner only)
router.put('/:id', isShopOwner, updateProduct);
  
// Delete a product (shop owner only)
router.delete('/:id', isShopOwner, deleteProduct);

module.exports = router;