//NHB04jfs3EkRueNA

//mongodb+srv://<db_username>:<db_password>@cluster0.luiw5.mongodb.net/

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cropRouter from './routes/cropRoute.js';  // Add .js extension
import salesRouter from './routes/salesRoutes.js';  // Add .js extension
import expensesRouter from './routes/expensesRoutes.js';  // Add .js extension
import reportRouter from './routes/reportRoutes.js';  // Add .js extension
import userRouter from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up routes
app.use("/crops", cropRouter);
app.use("/api/sales", salesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/report", reportRouter);
app.use("/api/users", userRouter);

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
