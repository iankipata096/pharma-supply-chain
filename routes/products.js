const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Retailer Product Schema
const retailerProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    expiryDate: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const RetailerProduct = mongoose.model("RetailerProduct", retailerProductSchema, "products");

// Route to add a new product (for retailer inventory)
router.post("/add", async (req, res) => {
    try {
        const newProduct = new RetailerProduct(req.body);
        await newProduct.save();
        res.status(201).json({ message: "Product added to retailer inventory!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to fetch all products (retailer inventory)
router.get("/", async (req, res) => {
    try {
        const products = await RetailerProduct.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a product from retailer inventory
router.delete("/delete/:id", async (req, res) => {
    try {
        await RetailerProduct.findByIdAndDelete(req.params.id);
        res.json({ message: "Product removed from retailer inventory!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
