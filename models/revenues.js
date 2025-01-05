const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
    shopId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Shop', required: true },
    period: {
        year: { type: Number, required: true },
        month: { type: Number, required: true },
        week: { type: Number, required: true},
        day: { type: Number, required: true}
  },
  metrics: {
    totalRevenue: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    averageOrderValue: { type: Number, default: 0 }
  },
  dailyRevenue: [{
    date: Date,
    amount: Number,
    orderCount: Number
  }]
}, { timestamps: true });

const Revenue  = mongoose.model('Revenue', revenueSchema );
module.exports = { Revenue };