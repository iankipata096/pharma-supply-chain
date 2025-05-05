const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/pharma-supply-chain", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

  const authRoutes = require("./routes/auth");
  const inventoryRoutes = require("./routes/inventory");
  const productRoutes = require("./routes/products"); // New Products Route
  const orderRoutes = require("./routes/orders"); // New Orders Route
  const deliveryRoutes = require("./routes/deliveries"); // ✅ New Deliveries Route



  
  app.use("/auth", authRoutes);
  app.use("/inventory", inventoryRoutes);
  app.use("/products", productRoutes); // Use Products Routes
  app.use("/orders", orderRoutes); // Orders API
  app.use("/deliveries", deliveryRoutes); // ✅ Register deliveries route


  require("./websocket"); 


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
