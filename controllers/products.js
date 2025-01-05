const { Product } = require('../models/products');

// Create a new product (shop owner only)
async function createProduct  (req, res) {
    try {
      const product = new Product({ ...req.body, shopId: req.user.shopId });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: 'Error creating product', error: error.message });
    }
}

// Get all products
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching products', error: error.message });
    }
}

// Get a specific product
async function getProduct(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching product', error: error.message });
    }
}

// Update a product (shop owner only)
async function updateProduct(req,res){
    try {
        const product = await Product.findOneAndUpdate(
          { _id: req.params.id, shopId: req.user.shopId },
          req.body,
          { new: true }
        );
        if (!product) {
          return res.status(404).json({ message: 'Product not found or you do not have permission to update it' });
        }
        res.json(product);
      } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
}

// Delete a product (shop owner only)
async function deleteProduct(req,res) {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, shopId: req.user.shopId });
        if (!product) {
          return res.status(404).json({ message: 'Product not found or you do not have permission to delete it' });
        }
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
};