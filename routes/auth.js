const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        console.log("📩 Received Registration Request:", req.body)


        const { username, email, companyName, password, role } = req.body;

        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, companyName, password: hashedPassword, role });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
