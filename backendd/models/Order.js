const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyerDetails: {
    name: String,
    email: String,
    address: String,
    location: String,
  },
  farmers: [
    {
      farmerDetails: {
        farmerName: String,
        farmerEmail: String,
        farmerAddress: String,
        location: String,
      },
      products: [
        {
          productId: String,
          name: String,
          quantity: Number,
          price: Number,
          grade: String,
          image: String,
        },
      ],
    },
  ],
  transportation: String,
  transportationCost: Number,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
