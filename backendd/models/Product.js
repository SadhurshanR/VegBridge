const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  grade: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerAddress: { type: String, required: true },
  farmerEmail: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },// Reference to the user who added the product
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
