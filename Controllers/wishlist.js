const wishlistModel = require("../Models/wishlist");
const mongoose = require("mongoose");

const getWishlistProduct = async (req,res)=>{
 
    const custid = req.query.custId;
    const resp = await wishlistModel.find({ custId: custid })
    // console.log("hey wh",custid)

    console.log("Wishlist products fetched succesffully");
    res.json({
        status : true,
        message : "Wishlist products fetched succesffully",
        data : resp
    });
}

const addToWishlist = async (req,res)=>{

    try{
        const newProduct = new wishlistModel(req.body);
        await newProduct.save();

        console.log("Product added to wishlist");
        res.json({
            status : true,
            message : "Product added to wishlist"
        });
    }
    catch(error){
        console.log("Error while inserting the product data to wishlist", error);
        res.json({
            status : false,
            message : "Error while inserting the product data to wishlist"
        });
    }
}


const removeFromWishlist = async (req,res)=>{
    
    const { custId, productId } = req.query;
    console.log("removed",custId,productId);
    try {
        const removedProduct = await wishlistModel.findOneAndDelete({ custId, productId });

        if (removedProduct) {
            console.log("Product is removed from wishlist");
            res.json({
                message : "Product is removed from wishlist"
            })
        } else {
            console.log("Product not found in wishlist--------------------------");
            res.json({
                message: "Product not found in wishlist"
            });
        }
    }
    catch (error) {
        console.log("Error while removing the product from wishlist", error);
        res.json({
            message: "Error while removing the product from wishlist"
        });
    }
}

const getWishlistDetails = async (req,res)=>{
    const { custId, productId } = req.body;
    // console.log("values are",custId,productId);
    try{
        const isInWishlist = await wishlistModel.findOne({ custId, productId });
        // console.log("check kar",isInWishlist);
        
        if(isInWishlist){   
            console.log("Product existed in wishlist");
            res.json({
                message : "Product existed in wishlist",
                isProductInWishlist : true
            });
        }
        else {
            console.log("Product doesn't existed in wishlist");
            res.json({
                message: "Product doesn't existed in wishlist",
                isProductInWishlist : false
            });
        }
    }
    catch(error){
        console.log("Error while checking either product is in wishlist or not !",error);
        res.json({
            status : true,
            message : "Error while checking either product is in wishlist or not !"
        });
    }
}

const getWishlistProductListWithDetails = async (req,res)=>{
    try{
        // console.log("query is ",req.query);
        const { custId } = req.query;
        const custObjectId = new mongoose.Types.ObjectId(custId);
        const cartItems = await wishlistModel.find({ custId: custObjectId }).populate('productId');

        console.log("Fetched wishlist product list with individual's detail");
        res.json({
            status : true,
            message : "Fetched wishlist product list with individual's detail",
            data : cartItems
        });
    }
    catch(error){
        console.log("Error while Fetching wishlist product list with individual's detail",error);
        res.json({
            status : false,
            message : "Error while Fetching wishlist product list with individual's detail"
        });
    }
}

const wishlistController = {
    addToWishlist,
    getWishlistProduct,
    removeFromWishlist,
    getWishlistDetails,
    getWishlistProductListWithDetails
}

module.exports = wishlistController;