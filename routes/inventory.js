const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wss = require("../websocket"); // ✅ Import WebSocket


// Define Manufacturer Inventory Schema
const inventorySchema = new mongoose.Schema({
    productName: String,
    batchNo: String,
    expiryDate: String,
    quantity: Number
});

const InventoryProduct = mongoose.model("InventoryProduct", inventorySchema, "inventory");

// Route to add product to inventory
router.post("/add", async (req, res) => {
    try {
        const newProduct = new InventoryProduct(req.body);
        await newProduct.save();

        // ✅ Broadcast new product to all WebSocket clients (Retailer Dashboards)
        wss.broadcast(JSON.stringify({ type: "new_product", data: newProduct }));

        res.status(201).json({ message: "Product added to manufacturer inventory!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to fetch inventory
router.get("/", async (req, res) => {
    try {
        const products = await InventoryProduct.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a product from inventory
router.delete("/delete/:id", async (req, res) => {
    try {
        await InventoryProduct.findByIdAndDelete(req.params.id);
        res.json({ message: "Product removed from manufacturer inventory!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
