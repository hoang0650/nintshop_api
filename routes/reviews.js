var express = require('express');
var router = express.Router();
const { isAdmin, isShopOwner } = require('../middleware/auth.js');
const { createReview, getAllReviews, getAllReviewUsers, updateReview, deleteReview, shopRespondReview } = require('../controllers/reviews');

// Create a new review (authenticated users only)
router.post('/', isAdmin, createReview);

// Get all reviews for a product
router.get('/product/:productId', getAllReviews);

// Get all reviews by a user
router.get('/user', isAdmin, getAllReviewUsers);

// Update a review (review owner only)
router.put('/:id', isAdmin, updateReview);

// Delete a review (review owner or admin only)
router.delete('/:id', isAdmin, deleteReview);

// Respond to a review (shop owner only)
router.post('/:id/respond', isShopOwner, shopRespondReview);


module.exports = router;