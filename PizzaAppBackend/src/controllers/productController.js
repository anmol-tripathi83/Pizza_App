const { createProduct } = require("../services/productService");

async function addProduct(req, res){
    try {
        const product = await createProduct({
            productName : req.body.productName,
            description : req.body.description,  
            imagePath: req.file.path,            
            price : req.body.price,
            category : req.body.category,    // if category is undefined veg will be stored(default)
            inStock : req.body.inStock       // if instock is undefined then true will be stored
        });
        return res.status(201).json({
            success: true,
            message : "Product Added Successfully",
            data: product,
            error: {}
        })
    } catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
}

module.exports = { 
    addProduct      // now it is returning function
};             