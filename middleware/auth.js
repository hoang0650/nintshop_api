const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const { Shop} = require('../models/shops')
async function isAdmin (req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      userId: user._id,
      role: user.role
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

async function isShopOwner (req, res, next) {
  try {
    // First, check if the user is authenticated
    await isAdmin(req, res, async () => {
      if (req.user.role !== 'shop') {
        return res.status(403).json({ message: 'Access denied. Shop owner rights required.' });
      }

      const shop = await Shop.findOne({ userId: req.user.userId });

      if (!shop) {
        return res.status(403).json({ message: 'Shop not found for this user' });
      }

      req.user.shopId = shop._id;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {isAdmin,isShopOwner}