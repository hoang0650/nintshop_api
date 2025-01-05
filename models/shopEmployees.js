const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Shop Employee Schema
const shopEmployeeSchema = new Schema({
    shopId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Shop', required: true },
    branchId: { type: mongoose.SchemaTypes.ObjectId, ref:'Shop', required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['manager', 'staff', 'accountant', 'warehouse_keeper'], default: 'staff' },
    permissions: [{
      type: String,
      enum: ['manage_products', 'view_revenue', 'manage_orders', 'manage_inventory', 'manage_staff', 'manage_branches']
    }],
    employmentInfo: {
      startDate: Date,
      position: String,
      department: String,
      status: { type: String, enum: ['active', 'inactive', 'on_leave'], default: 'active' }
    }
  }, { timestamps: true });

const ShopEmployee = mongoose.model('ShopEmployee', shopEmployeeSchema);
module.exports = { ShopEmployee };

