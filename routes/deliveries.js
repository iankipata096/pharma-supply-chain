const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Define Deliveries Schema
const deliverySchema = new mongoose.Schema({
    productName: String,
    batchNo: String,
    quantity: Number,
    status: { type: String, default: "In Transit" } // ✅ Default status
});

const Delivery = mongoose.model("Delivery", deliverySchema, "deliveries");

// ✅ Route to add a completed order to deliveries
router.post("/add", async (req, res) => {
    try {
        const newDelivery = new Delivery(req.body);
        await newDelivery.save();
        res.status(201).json(newDelivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Route to fetch all deliveries
router.get("/", async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
