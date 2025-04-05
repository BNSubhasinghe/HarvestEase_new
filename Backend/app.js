//NHB04jfs3EkRueNA



//mongodb+srv://<db_username>:<db_password>@cluster0.luiw5.mongodb.net/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cropRouter = require('./routes/cropRoute'); 
const salesRouter = require('./routes/salesRoutes');  
const expensesRouter = require('./routes/expensesRoutes');  
const reportRouter = require('./routes/reportRoutes'); 
const userRouter = require('./routes/userRoutes');  
const stockRoutes = require('./routes/stockRoutes');
const diseaseRouter = require('./routes/diseaseRoute');//mayomi


const app = express();

console.log("Plant API Key:", process.env.PLANT_API_KEY);//mayomi

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Set up routes
app.use("/crops", cropRouter);
app.use("/api/sales", salesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/report", reportRouter);
app.use("/api/users", userRouter);
app.use('/api', stockRoutes);
app.use("/api/diseases", diseaseRouter);//mayomi


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