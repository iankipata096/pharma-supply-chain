const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productName: String,
    batchNo: String,
    expiryDate: String,
    quantity: Number
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
