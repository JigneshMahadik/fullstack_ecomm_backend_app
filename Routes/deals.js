const express = require("express");
const router = express.Router();

const dealsControllers = require("../Controllers/deals");

router.get("/getAllDealsProducts",dealsControllers.getAllDealsProducts);


module.exports = router;