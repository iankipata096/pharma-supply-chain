const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['distributor', 'manufacturer', 'retailer'], required: true }
}, { collection: "users" });

module.exports = mongoose.model('User', UserSchema);
