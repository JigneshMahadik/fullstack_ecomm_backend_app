const productsModel = require("../Models/products");

const getAllDealsProducts = async (req, res) => {
    try{
        // console.log("val is",req.query.filter);
        const { pageNo, filter } = req.query;
        let sortOrder = {};
        if (filter === "lh") {
            sortOrder.price = 1; // Ascending order
        } else if (filter === "hl") {
            sortOrder.price = -1; // Descending order
        }

        const products = await productsModel.find({ offer: { $gt: 1 } })
        .sort(sortOrder)
        .skip(pageNo * 1)
        .limit(5);
        console.log("Deals fetched successfully");
        res.json({
            message: "Fetched deals successfully",
            data: products
        });
    }
    catch(error){
        console.log("Error while fetching deals !",error);
        res.status(500).json({
            message: "Error fetching deals",
            error: error.message
        });
    }
}



const dealsController = {
    getAllDealsProducts,
}

module.exports = dealsController;
