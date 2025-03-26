//NHB04jfs3EkRueNA

//mongodb+srv://<db_username>:<db_password>@cluster0.luiw5.mongodb.net/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cropRouter = require("./routes/cropRoute");
const diseaseRouter = require("./routes/diseaseRoute");//Mayomi



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/crops", cropRouter); 
app.use("/diseases", diseaseRouter);//mayomi

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//mayomi




// MongoDB connection 
mongoose.connect("mongodb+srv://farmer:NHB04jfs3EkRueNA@cluster0.luiw5.mongodb.net/")
    .then(() => 
        console.log("Connected to MongoDB"))
        .then(()=>{
            app.listen(5000);
        })
      

    .catch((err) => console.log((err)));
