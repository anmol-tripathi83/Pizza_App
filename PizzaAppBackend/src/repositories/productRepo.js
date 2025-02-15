const Product = require('../schema/productSchema');
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/InternalServerError');

// interacting with the database(creating a new product with following product details which is in productDetails object)
async function createProduct(ProductDetails){
    try{
        const response = await Product.create(ProductDetails);
        return response; 
    } catch(error){ 
        if(error.name == 'ValidationError'){    // sent by mongoose(when req schema info is not given by the user or incorrect email format etc..)
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        // otherwise internalServer error
        throw new InternalServerError();   // DB se related issue
    }
}

// Function to interact with DB and fetching product by their id
async function getProductById(productId){
    try{
        const product = await Product.findById(productId);
        return product;
    } catch(error){
        console.log(error);
        throw new InternalServerError();  // DB se related issue
    }
}

// Function to interact with DB and deleting product by their id
async function deleteProductById(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return response;
    } catch(error){
        console.log(error);
        throw new InternalServerError();   // DB se related issue
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};