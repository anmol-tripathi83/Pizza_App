const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises');
const ProductRepository = require('../repositories/productRepo');

// It will create brand new product it the database
async function createProduct(productDetails){
    // 1. We should check if an image is coming to craete the product, then we should first upload it to the cloudinary
    const imagePath = productDetails.imagePath;
    if(imagePath){
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch(error){
            console.log(error);
            throw {reason: 'Not able to create product',statusCode: 500};
        }
    }
    // 2. Then use the url from cloudinary and other product details to add product in the DB
    const product = await ProductRepository.createProduct({
        ...productDetails,
        productImage : productImage
    });

    if(!product){
        throw {reason: 'Not able to create product',statusCode: 500};
    }

    return product;
}

async function getProductById(productId){
    const response = await ProductRepository.getProductById(productId);

    if(!response){
        throw {reason: 'Not able to find the Product', statusCode: 404};
    }
    return response;
}

async function deleteProductById(productId){
    const response = await ProductRepository.deleteProductById(productId);

    if(!response){
        throw {reason: 'Can not delete the Product', statusCode: 500};
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
};