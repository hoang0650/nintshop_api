const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
    productId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    orderId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: String,
    content: String,
    pros: [String],
    cons: [String],
    images: [String],
    helpfulVotes: { type: Number, default: 0 },
    verifiedPurchase: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    shopResponse: {
        content: String,
        respondedAt: Date
    }
}, { timestamps: true });

const ProductReview = mongoose.model('ProductReview', productReviewSchema);
module.exports = { ProductReview };