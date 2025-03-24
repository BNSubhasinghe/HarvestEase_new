require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cropRouter = require("./routes/cropRoute");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/crops", cropRouter); 
app.use("/api/users", userRoutes);

// MongoDB connection 
mongoose.connect("mongodb+srv://kasuni_k:wgqvS8Xjslbc7oT3@harvestesedb.2trfj.mongodb.net/?retryWrites=true&w=majority&appName=HarvestEseDB")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err);
    });
