const { Order } = require('../models/orders');
const { Product } = require('../models/products');

// Create a new order (authenticated users only)
async function createOrder(req, res) {
    try {
        const { items, shippingAddress } = req.body;
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (product.inventory.available < item.quantity) {
                return res.status(400).json({ message: `Insufficient inventory for product: ${product.name}` });
            }
            const subtotal = product.price * item.quantity;
            const tax_fee = (product.price * 1.5)/100
            const vat = product.price*0.1
            totalAmount += subtotal;
            orderItems.push({
                productId: product._id,
                name: product.name,
                discount: product.discount,
                shipping_fee: product.shipping_fee,
                tax_fee,
                vat,
                price: product.price,
                quantity: item.quantity,
                subtotal
            });

            // Update product inventory
            await Product.findByIdAndUpdate(product._id, {
                $inc: {
                    'inventory.available': -item.quantity,
                    'inventory.reserved': item.quantity
                }
            });
        }

        const order = new Order({
            userId: req.user.userId,
            shopId: orderItems[0].productId.shopId, // Assuming all items are from the same shop
            orderNumber: `ORD-${Date.now()}`,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
}

// Get all orders for a user
async function getAllOrderUsers (req, res) {
    try {
      const orders = await Order.find({ userId: req.user.userId });
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching orders', error: error.message });
    }
}

// Get all orders for a shop (shop owner only)
async function getAllOrderShops (req, res) {
    try {
      const orders = await Order.find({ shopId: req.user.shopId });
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching orders', error: error.message });
    }
}

// Get a specific order
async function getOrder (req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (req.user.role !== 'admin' && order.userId.toString() !== req.user.userId && order.shopId.toString() !== req.user.shopId) {
        return res.status(403).json({ message: 'You do not have permission to view this order' });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching order', error: error.message });
    }
}

// Update order status (shop owner only)
async function updateOrderStatus (req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findOneAndUpdate(
        { _id: req.params.id, shopId: req.user.shopId },
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: 'Order not found or you do not have permission to update it' });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error updating order status', error: error.message });
    }
  }

module.exports = {
    createOrder,
    getAllOrderUsers,
    getAllOrderShops,
    getOrder,
    updateOrderStatus
};