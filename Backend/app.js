//NHB04jfs3EkRueNA


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cropRouter = require("./routes/cropRoute");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require('./routes/stockRoutes');  // Import stock routes


//mongodb+srv://<db_username>:<db_password>@cluster0.luiw5.mongodb.net/

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cropRouter from './routes/cropRoute.js';  
import salesRouter from './routes/salesRoutes.js'; 
import expensesRouter from './routes/expensesRoutes.js'; 
import reportRouter from './routes/reportRoutes.js'; 


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/crops", cropRouter); 
app.use("/api/users", userRoutes);
app.use('/api', stockRoutes);

// Set up routes

app.use("/api/sales", salesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/report", reportRouter);  


// MongoDB connection 
mongoose.connect("mongodb+srv://farmer:NHB04jfs3EkRueNA@cluster0.luiw5.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server after successful MongoDB connection
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((err) => console.log(err));
