const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Types.ObjectId,
        ref : "products"
    },
    custId : {
        type : mongoose.Types.ObjectId,
        ref : "customers"
    },
    quantity : {
        type : Number,
        default : 1
    }
},
{
    timestamps : true
});


const cartModel = mongoose.model("cart",cartSchema);
module.exports = cartModel;