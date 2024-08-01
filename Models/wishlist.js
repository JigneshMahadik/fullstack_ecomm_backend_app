const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Types.ObjectId,
        ref : "products"
    },
    custId : {
        type : mongoose.Types.ObjectId,
        ref : "customers"
    }
},
{
    timestamps : true
});


const wishlistModel = mongoose.model("wishlist",wishlistSchema);
module.exports = wishlistModel;