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

module.exports = {
    createProduct
};