const cartModel = require("../Models/cart");
const mongoose = require("mongoose");

const addToCart = async (req,res)=>{
    
    try{
        const cartProduct = new cartModel(req.body);
        await cartProduct.save();

        console.log("Product added to cart");
        res.json({
            message : "Product added to cart"
        });
    }
    catch(error){
        console.log("Error while carting the product",error);
        res.json({
            message : "Error while carting the product"
        });
    }
}


const getCartedProductList = async (req,res)=>{

    // const { custId } = req.query;
    // const custObjectId = new mongoose.Types.ObjectId(custId);
    // const cartItems = await cartModel.find({ custId: custObjectId });

    const {custId} = req.query;
    const resp = await cartModel.find({ custId: custId });
    // console.log("value is ", resp);

    console.log("Carted product list fetched succesffully");
    res.json({
        status : true,
        message : "Carted product list fetched succesffully",
        data : resp
    })
}


const removeFromCart = async (req,res)=>{

    const { custId, productId } = req.query;
    console.log("jack",custId,productId);
    try {
        const removedProduct = await cartModel.findOneAndDelete({ custId, productId });

        if (removedProduct) {
            console.log("Product is removed from cart");
            res.json({
                message: "Product is removed from cart"
            });
        } else {
            console.log("Product not found in cart");
            res.json({
                message: "Product not found in cart"
            });
        }
    }
    catch (error) {
        console.log("Error while removing the product from cart", error);
        res.json({
            message: "Error while removing the product from cart"
        });
    }
}

const getCartDetails = async (req,res)=>{

    const { custId, productId } = req.body;
    
    try{
        const isCarted = await cartModel.findOne({ custId, productId });
        // console.log("record is",isCarted);

        if(isCarted){
            console.log("Added product is in cart");
            res.json({
                message : "Added product is in cart",
                isProductInCart : true
            });
        }
        else {
            console.log("Product not found in cart");
            res.json({
                message: "Product not found in cart",
                isProductInCart : false
            });
        }
    }
    catch(error){
        console.log("Error while fetching cart details", error);
        res.json({
            message: "Error while fetching cart details"
        });
    }
}


const getCartedProductListWithDetails = async (req,res)=>{
    try{
        // console.log("query is ",req.query);
        const { custId } = req.query;
        const custObjectId = new mongoose.Types.ObjectId(custId);
        const cartItems = await cartModel.find({ custId: custObjectId }).populate('productId');

        console.log("Fetched carted product list with individual's detail");
        res.json({
            status : true,
            message : "Fetched carted product list with individual's detail",
            data : cartItems
        });
    }
    catch(error){
        console.log("Error while Fetching carted product list with individual's detail",error);
        res.json({
            status : false,
            message : "Error while Fetching carted product list with individual's detail"
        });
    }
}


const increaseQuantity = async (req,res)=>{
    const { custId, productId } = req.query;
    // console.log(productId)
    try{
        const resp = await cartModel.findOneAndUpdate({custId,productId},{$inc : {quantity : 1}});

        if (resp) {
            console.log("Quantity has been increased", productId);
            res.json({
                status: true,
                message: "Quantity has been increased",
                data: resp // Include updated data in response if needed
            });
        } else {
            console.log("Product not found in cart");
            res.json({
                status: false,
                message: "Product not found in cart"
            });
        }
    }
    catch(error){
        console.log("Error while increasing quantity", error);
        res.json({
            status: false,
            message: "Error while increasing quantity"
        });
    }
}


const decreaseQuantity = async (req,res)=>{
    const { custId, productId } = req.query;
    // console.log(productId)
    try{
        const resp = await cartModel.findOneAndUpdate({custId,productId},{$inc : {quantity : -1}});

        if (resp) {
            console.log("Quantity has been decreased", productId);
            res.json({
                status: true,
                message: "Quantity has been decreased",
                data: resp // Include updated data in response if needed
            });
        } else {
            console.log("Product not found in cart");
            res.json({
                status: false,
                message: "Product not found in cart"
            });
        }
    }
    catch(error){
        console.log("Error while decreasing quantity", error);
        res.json({
            status: false,
            message: "Error while decreasing quantity"
        });
    }
}

const cartController = {
    addToCart,
    getCartedProductList,
    removeFromCart,
    getCartDetails,
    getCartedProductListWithDetails,
    increaseQuantity,
    decreaseQuantity
}

module.exports = cartController;