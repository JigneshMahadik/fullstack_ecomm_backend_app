const express = require("express");
const router = express.Router();

const productsControllers = require("../Controllers/products");

router.post("/addProducts",productsControllers.addProducts);    //Adds product's data.

router.get("/getTopBrandList",productsControllers.getTopBrandList);    //Fetched all top brand product list.

router.post("/getCategoryBasedProducts",productsControllers.getCategoryBasedProducts);    //Fetched produst list based on category.

router.get("/productDetails",productsControllers.productDetails);

router.get("/getProductsBasedOnCollectionCategory",productsControllers.getProductsBasedOnCollectionCategory);

module.exports = router;