const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const axios = require("axios");


// WebSocket server integration
const wss = require("../websocket"); // Import WebSocket

// Route to place a new order
router.post("/add", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        
        // Broadcast new order to all WebSocket clients (Retailer & Manufacturer Dashboards)
        wss.broadcast(JSON.stringify({ type: "new_order", data: newOrder }));

        res.status(201).json({ message: "Order placed successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to fetch all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to complete an order
router.delete("/complete/:id", async (req, res) => {
    try {
        const completedOrder = await Order.findById(req.params.id);
        if (!completedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        // ✅ Ensure the delivery is stored before deleting the order
        const response = await axios.post("http://localhost:5000/deliveries/add", {
            productName: completedOrder.productName,
            batchNo: completedOrder.batchNo,
            quantity: completedOrder.quantity
        });

        if (!response.data) {
            return res.status(500).json({ message: "Failed to save order to deliveries" });
        }

        // ✅ Remove from "orders" collection
        await Order.findByIdAndDelete(req.params.id);

        // ✅ WebSocket broadcast for real-time updates
        wss.broadcast(JSON.stringify({ type: "new_delivery", data: response.data }));

        res.json({ message: "Order completed and moved to deliveries.", data: response.data });
    } catch (err) {
        console.error("❌ Error completing order:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
