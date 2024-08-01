const express = require("express");
const authRoutes = require("./Routes/auth");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();
const productRoutes = require("./Routes/products");
const path = require("path");
const cartRoutes = require("./Routes/cart");
const wishlistRoutes = require("./Routes/wishlist");
// const cookieParser = require('cookie-parser');
const dealsRoutes = require("./Routes/deals");
const ordersRoutes = require("./Routes/orders");


// app.use(cookieParser());
app.use(express.json());


// Use the CORS middleware
app.use(cors({
    origin: 'https://fullstack-ecomm-frontend-app.vercel.app', // Replace with the origin you want to allow
    // origin : "http://localhost:3000",
    // allowedHeaders: 'Content-Type,Authorization'
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: 'Content-Type,Authorization',
    // credentials: true
}));




app.use(authRoutes);
// Serve static files from the "filesUploaded" directory
app.use('/filesUploaded', express.static(path.join(__dirname, 'filesUploaded')));
app.use(productRoutes);      //Temporary for adding products.
app.use(cartRoutes);
app.use(wishlistRoutes);
app.use(dealsRoutes);
app.use(ordersRoutes);



mongoose.connect("mongodb+srv://jignesh:dUaszhl26B0rpW0f@cluster0.s7hzif4.mongodb.net/")
// mongoose.connect("mongodb+srv://jignesh:dUaszhl26B0rpW0f@cluster0.s7hzif4.mongodb.net/")
.then(()=>{ console.log("DB Connection Successful"); })
.catch((error)=>{ console.log("Error while DB Connection !", error); })

app.listen(10000,()=>{
    console.log("Server is up and running on port : 10000");
});