const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    offer : {
        type : Number,
        // default : 0,
        // required : false
    },
    product_type : {
        type : String,
        required : true
    },
    ratings : {
        type : String,
        required : true
    },
    product_detail :{
        type : String,
        required : true
    },
    product_image : {
        type : String,
        required : false
    },
    product_category : {
        type : String,
        required : true
    },
    product_sub_category : {
        type : String,
        required : false
    }
},
{
    timestamps : true
});

const customerModel = mongoose.model("products",productSchema);
module.exports = customerModel;