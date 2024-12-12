require("dotenv").config();
const express = require("express");
const router = require("./Routers/hotelrouter");
const Mongoconnect = require("./mongoconnection/connection");
const wishlistrouter = require("./Routers/wishlistRouter");
const mongoose = require("mongoose");
const UserRouter = require("./Routers/UserRouters");
const Error = require("./middlewares/Error-middleware");
const app = express();
const cors = require('cors');
var corsOptions = {
    origin:'http://localhost:3001',
    methods:"GET,POST, PUT, DELETE, PATCH , HEAD",
    credentials:true,
};

app.use(express.json());
app.use(express.json(corsOptions));
app.use(cors())
app.use("/server",router);
app.use("/user",UserRouter);
app.use("/user",wishlistrouter);
app.use(Error);
Mongoconnect();


const port = 5000;
mongoose.connection.once("open",()=>{
    console.log("Connection DB")
    app.listen(port ,()=>{
        console.log("server run successfully");
    } );
});



