const ordersModel = require("../Models/orders");
const productsModel = require("../Models/products");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const dotenv = require('dotenv');
const cartModel = require("../Models/cart");

dotenv.config();

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const placeOrder = async (req, res) => {
    try{
        const { custid, total } = req.query;

        const orderDetails = {
            amount : total*100,
            currency : "INR",
            receipt : "TEMP123"
        }
        const newOrder = await razorpay.orders.create(orderDetails);
        // console.log("Response from razorpay",newOrder);
        
        const resp = new ordersModel({
            custId : custid,
            products : req.body.product,
            total_amount : newOrder.amount,
            amount_due : newOrder.amount_due,
            amount_paid : newOrder.amount_paid,
            // created_at : newOrder.created_at,
            currency : newOrder.currency,
            razorpay_order_id : newOrder.id,
            receipt : newOrder.receipt,
            status : newOrder.status,
        });
        await resp.save();

        res.json({
            message : "Order placed successfully",
            newOrder
        });
    }
    catch(error){
        console.log("Error while placing the order !",error);
        res.json({
            message : "Error while placing the order !",
            Error : error
        });
    }
}


const verifyPayment = async(req,res)=>{

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // console.log("Body is :",req.body);
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if(generated_signature === razorpay_signature)
    {
        await ordersModel.findOneAndUpdate(
            { razorpay_order_id },
            {
                // razorpay_payment_id,
                // razorpay_signature,
                amount_paid : req.query.total,
                amount_due : 0,
                status: 'paid',
            },
        );
        // await cartModel.findByIdAndDelete(req.query.custid);
        await cartModel.deleteMany({ custId: req.query.custid });
        res.json({ status: 'success' });
    } 
    else
    {
        res.status(400).json({ status: 'failure' });
    }
}


const orders = async (req,res)=>{

    const response = await ordersModel.find({custId : req.query.custid});
    
    res.json({
        message : "Orders fetched succesffully",
        response
    })
}


const ordersController = {
    placeOrder,
    verifyPayment,
    orders
}

module.exports = ordersController;
