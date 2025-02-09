const Product = require('../schema/productSchema');

// interacting with the database(creating a new product with following product details which is in productDetails object)
async function createProduct(ProductDetails){
    try{
        const response = await Product.create(ProductDetails);
        return response; 
    } catch(error){
        console.log(error);
    }
}

// Function to interact with DB and fetching product by their id
async function getProductById(productId){
    try{
        const product = await Product.findById(productId);
        return product;
    } catch(error){
        console.log(error);
    }
}

// Function to interact with DB and deleting product by their id
async function deleteProductById(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return true;
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};