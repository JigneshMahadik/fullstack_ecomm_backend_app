const express = require("express");
const authRoutes = require("./Routes/auth");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());

// Use the CORS middleware
app.use(cors({
    // origin: 'https://fullstack-ecomm-frontend-app.vercel.app/', // Replace with the origin you want to allow
    origin : "http://localhost:3000",
    // allowedHeaders: 'Content-Type,Authorization'
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(authRoutes);

mongoose.connect("mongodb+srv://jignesh:dUaszhl26B0rpW0f@cluster0.s7hzif4.mongodb.net/")
.then(()=>{ console.log("DB Connection Successful"); })
.catch((error)=>{ console.log("Error while DB Connection !", error); })

app.listen(8082,()=>{
    console.log("Server is up and running on port : 8082");
});