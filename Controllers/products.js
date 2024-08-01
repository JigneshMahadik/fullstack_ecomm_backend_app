const productsModel = require("../Models/products");
const multer = require("multer");
const path = require("path");

const uploadDirePath = path.join(__dirname, "..", "filesUploaded");

const storage = multer.diskStorage({
    destination : (req,file, cb)=>{
        cb(null, uploadDirePath);
    },
    filename : (req,file,cb)=>{
        // const fileName = file.originalname;
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
});
    
const upload = multer({
    storage : storage
}).single("product_image");


const addProducts = (req,res)=>{
    upload(req,res,async(error)=>{
        if(error){
            res.json({
                message : error,
            });
            return;
        }

        try{
            const filePath = path.join('/filesUploaded', req.file.filename);
            const newProductData = {
                ...req.body,
                product_image: filePath
            };
            const newProduct = new productsModel(newProductData);
            // const newProduct = new productsModel(req.body);
            await newProduct.save();
    
            res.json({
                Message : "Products added asuccesfully"
            });
            console.log("Products added asuccesfully");
        }
        catch(error){
            console.log("Error while inserting the Data !",error);
        }

    });
}


const getTopBrandList = async (req,res)=>{
    
    try{
        if(req.query.category == "null"){
            var resp = await productsModel.find().skip(req.query.pageNo * 1).limit(5);
        }
        else{
            var resp = await productsModel.find({ product_category : req.query.category }).skip(req.query.pageNo * 1).limit(5);
            // console.log("val is",resp);
        }
        
        console.log("Data is fetched successfully");
        res.json({
            status : true,
            message : "Data is fetched successfully",
            data : resp
        });
    }
    catch(error){
        console.log("Error while fetching product list",error);
        res.json({
            status : false,
            message : "Error while fetching product list"
        })
    }
}


const getCategoryBasedProducts = (req,res)=>{
    console.log("Categoruies")
    res.json({
        message : "categoryies"
    })
}

const productDetails = async (req,res)=>{

    const product_details = await productsModel.findById(req.query.proid);

    res.json({
        status : true,
        message : "Product Details",
        data : product_details
    });
}


const getProductsBasedOnCollectionCategory = async (req,res)=>{
    const { sub_category, filter } = req.query;
    
    let sortOrder = {};
    if (filter === "lh") {
        sortOrder.price = 1; // Ascending order
    } else if (filter === "hl") {
        sortOrder.price = -1; // Descending order
    }

    if(sub_category == "null"){
        var resp = await productsModel.find({ product_sub_category : sub_category }).skip(req.query.pageNo * 1).limit(5);
    }
    else{
        var resp = await productsModel.find({ product_sub_category : sub_category }).sort(sortOrder).skip(req.query.pageNo * 1).limit(5);
    }
    
    console.log("Collection products fetched successfully");
    res.json({
        message : "Collection products fetched successfully",
        data : resp
    });
}


const productsControllers = {
    addProducts,
    getTopBrandList,
    getCategoryBasedProducts,
    productDetails,
    getProductsBasedOnCollectionCategory
}

module.exports = productsControllers;