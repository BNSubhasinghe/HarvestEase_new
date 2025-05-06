const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cropRouter = require("./routes/cropRoute");
const authRouter = require("./routes/authRoute"); // ✅ Added line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);   // ✅ Added route for auth
app.use("/crops", cropRouter);      // Existing crop route

// MongoDB connection
mongoose.connect("mongodb+srv://farmer:NHB04jfs3EkRueNA@cluster0.luiw5.mongodb.net/harvestease?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
