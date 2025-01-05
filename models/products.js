const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    shopId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Shop', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    salePrice: Number,
    category: String,
    images: [String],
    model3D: {
      url: String,
      format: String
    },
    inventory: {
      quantity: { type: Number, default: 0 },
      reserved: { type: Number, default: 0 },
      available: { type: Number, default: 0 }
    },
    status: { type: String, enum: ['active', 'inactive', 'out_of_stock'], default: 'active' },
    averageRating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 }
  }, { timestamps: true });

const Product  = mongoose.model('Product', productSchema);
module.exports = { Product  };