const { ProductReview } = require('../models/productReviews');
const { Product } = require('../models/products');

// Create a new review (authenticated users only)
async function createReview (req, res) {
    try {
      const { productId, orderId, rating, title, content, pros, cons } = req.body;
      const review = new ProductReview({
        productId,
        userId: req.user.userId,
        orderId,
        rating,
        title,
        content,
        pros,
        cons,
        verifiedPurchase: true // Assuming we've verified the purchase in a previous step
      });
      await review.save();
  
      // Update product's average rating and review count
      await Product.findByIdAndUpdate(productId, {
        $inc: { reviewCount: 1 },
        $set: { averageRating: await calculateAverageRating(productId) }
      });
  
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: 'Error creating review', error: error.message });
    }
}

// Get all reviews for a product
async function getAllReviews (req, res) {
    try {
      const reviews = await ProductReview.find({ productId: req.params.productId, status: 'approved' });
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching reviews', error: error.message });
    }
}

// Get all reviews by a user
async function getAllReviewUsers (req, res) {
    try {
      const reviews = await ProductReview.find({ userId: req.user.userId });
      res.json(reviews);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching reviews', error: error.message });
    }
}

// Update a review (review owner only)
async function updateReview (req, res) {
    try {
      const review = await ProductReview.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        req.body,
        { new: true }
      );
      if (!review) {
        return res.status(404).json({ message: 'Review not found or you do not have permission to update it' });
      }
      res.json(review);
    } catch (error) {
      res.status(400).json({ message: 'Error updating review', error: error.message });
    }
}

// Delete a review (review owner or admin only)
async function deleteReview (req, res) {
    try {
      const review = await ProductReview.findOneAndDelete({
        _id: req.params.id,
        $or: [{ userId: req.user.userId }, { 'req.user.role': 'admin' }]
      });
      if (!review) {
        return res.status(404).json({ message: 'Review not found or you do not have permission to delete it' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting review', error: error.message });
    }
}

// Respond to a review (shop owner only)
async function shopRespondReview (req, res) {
    try {
      const { content } = req.body;
      const review = await ProductReview.findOneAndUpdate(
        { _id: req.params.id, 'product.shopId': req.user.shopId },
        { 
          shopResponse: {
            content,
            respondedAt: new Date()
          }
        },
        { new: true }
      );
      if (!review) {
        return res.status(404).json({ message: 'Review not found or you do not have permission to respond to it' });
      }
      res.json(review);
    } catch (error) {
      res.status(400).json({ message: 'Error responding to review', error: error.message });
    }
}

// Helper function to calculate average rating
async function calculateAverageRating(productId) {
    const result = await ProductReview.aggregate([
      { $match: { productId: mongoose.Types.ObjectId(productId), status: 'approved' } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ]);
    return result[0]?.averageRating || 0;
  }

module.exports = {
    createReview,
    getAllReviews,
    getAllReviewUsers,
    updateReview,
    deleteReview,
    shopRespondReview
};