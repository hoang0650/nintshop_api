const { Shop } = require('../models/shops.js');
const { ShopEmployee } = require('../models/shopEmployees.js');

// Create a new shop (admin only)
async function createShop (req, res){
    try {
      const shop = new Shop(req.body);
      await shop.save();
      res.status(201).json(shop);
    } catch (error) {
      res.status(400).json({ message: 'Error creating shop', error: error.message });
    }
}

// Get all shops (admin only)
async function getAllShops (req, res){
    try {
        const shops = await Shop.find();
        res.json(shops);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching shops', error: error.message });
      }
}

// Get a specific shop
async function getShop (req, res){
    try {
        const shop = await Shop.findById(req.params.id);
        if (!shop) {
          return res.status(404).json({ message: 'Shop not found' });
        }
        res.json(shop);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching shop', error: error.message });
      }
}

// Update a shop (shop owner only)
async function updateShop (req, res){
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(shop);
      } catch (error) {
        res.status(400).json({ message: 'Error updating shop', error: error.message });
    }
}

// Delete a shop (admin only)
async function deleteShop (req, res){
    try {
        await Shop.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shop deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting shop', error: error.message });
    }
}

// Add an employee to a shop (shop owner only)
async function addEmployee (req, res){
    try {
        const employee = new ShopEmployee({ ...req.body, shopId: req.params.id });
        await employee.save();
        res.status(201).json(employee);
      } catch (error) {
        res.status(400).json({ message: 'Error adding employee', error: error.message });
    }
}

// Get all employees of a shop (shop owner only)
async function getAllEmployees (req, res){
    try {
        const employees = await ShopEmployee.find({ shopId: req.params.id });
        res.json(employees);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching employees', error: error.message });
    }
}

module.exports = {
    createShop,
    getAllShops,
    getShop,
    updateShop,
    deleteShop,
    addEmployee,
    getAllEmployees,
};