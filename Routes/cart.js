const express = require("express");
const router = express.Router();

const cartController = require("../Controllers/cart");

router.post("/addToCart",cartController.addToCart);

router.get("/getCartedProductList", cartController.getCartedProductList);   //Fetched list of carted products for particular customer.

router.delete("/removeFromCart", cartController.removeFromCart);      // Removes product from cart for particular userid.

router.post("/getCartDetails", cartController.getCartDetails);

router.post("/getCartedProductListWithDetails", cartController.getCartedProductListWithDetails);   //Fetched list with details of carted products for particular customer.

router.put("/increaseQuantity",cartController.increaseQuantity);   //Increased quanitity.

router.put("/decreaseQuantity",cartController.decreaseQuantity);    //Decreased quantity.

module.exports = router;