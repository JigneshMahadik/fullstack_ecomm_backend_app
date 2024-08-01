const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    custId : {
        type : mongoose.Types.ObjectId,
        ref : "customers"
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
                // required: true
            },
            quantity: {
                type: Number,
                // required: true
            }
        }
    ],
    total_amount : {
        type : Number
    },
    amount_due : {
        type : Number
    },
    amount_paid : {
        type : Number
    },
    // created_at : {
    //     type : Date
    // },
    currency : {
        type : String
    },
    razorpay_order_id : {
        type : String
    },
    receipt : {
        type : String
    },
    status : {
        type : String
    }
},
{
    timestamps : true
});


const ordersModel = mongoose.model("orders",ordersSchema);
module.exports = ordersModel;