const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    shopId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Shop', required: true },
    orderNumber: { type: String, required: true, unique: true },
    items: [{
        productId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true },
        name: String,
        price: Number,
        discount: Number,
        shipping_fee: Number,
        tax_fee: Number,
        vat: Number,
        quantity: Number,
        subtotal: Number
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        fullName: String,
        phone: String,
        address: String
    },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };