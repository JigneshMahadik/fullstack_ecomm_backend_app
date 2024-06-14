const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    mobile_number : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},
{
    timestamps : true
});

const customerModel = mongoose.model("customers",customerSchema);
module.exports = customerModel;