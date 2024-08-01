const express = require("express");
const router = express.Router();

const ordersController = require("../Controllers/orders");

router.post("/placeOrder",ordersController.placeOrder);

router.post("/verify-payment", ordersController.verifyPayment);

router.get("/orders",ordersController.orders);

module.exports = router;