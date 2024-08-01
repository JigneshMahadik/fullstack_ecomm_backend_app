const express = require("express");
const router = express.Router();

const wishlistController = require("../Controllers/wishlist");

router.post("/addToWishlist",wishlistController.addToWishlist);    //Adds product id and userid to for user's wishlist.

router.get("/getWishlistProduct", wishlistController.getWishlistProduct);   //Fetched product wish list added by particular customerid.

router.delete("/removeFromWishlist", wishlistController.removeFromWishlist);    //Remove product from wishlist for particular customerid.

router.post("/getWishlistDetails",wishlistController.getWishlistDetails);    //Fetched one product details whether it is added in wishlist or not.

router.post("/getWishlistProductListWithDetails", wishlistController.getWishlistProductListWithDetails);   //Fetched list with details of carted products for particular customer.

module.exports = router;