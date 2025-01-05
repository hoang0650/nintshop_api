const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Shop Schema
const shopSchema = new Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    logo: String,
    legalInfo: {
      taxCode: String,
      businessLicense: String,
      dateOfRegistration: Date,
      businessType: String
    },
    representative: {
      fullName: String,
      position: String,
      phone: String,
      email: String,
      identityCard: {
        number: String,
        dateOfIssue: Date,
        placeOfIssue: String
      }
    },
    branches: [{
      name: String,
      type: { type: String, enum: ['headquarters', 'branch', 'warehouse'], default: 'branch' },
      address: {
        street: String,
        ward: String,
        district: String,
        city: String,
        province: String,
        country: String,
        postalCode: String,
        coordinates: {
          latitude: Number,
          longitude: Number
        }
      },
      contact: {
        phone: String,
        email: String,
        manager: String
      },
      operatingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
      },
      status: { type: String, enum: ['active', 'inactive', 'renovating', 'closed'], default: 'active' }
    }],
    contact: {
      mainPhone: String,
      supportPhone: String,
      email: String,
      website: String,
      socialMedia: {
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String
      }
    },
    metrics: {
      totalRevenue: { type: Number, default: 0 },
      totalOrders: { type: Number, default: 0 },
      totalProducts: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 }
    },
    status: { type: String, enum: ['active', 'inactive', 'suspended', 'pending_approval'], default: 'pending_approval' },
    paymentInfo: {
      bankName: String,
      bankAccount: String,
      accountHolder: String,
      bankBranch: String
    }
  }, { timestamps: true });
  
const Shop = mongoose.model('Shop', shopSchema);
module.exports = { Shop };
