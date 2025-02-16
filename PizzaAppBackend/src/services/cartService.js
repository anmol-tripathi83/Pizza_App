const { getCartBYUserId } = require("../repositories/cartRepo");
const { getProductById } = require("../repositories/productRepo");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequest");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart = await getCartBYUserId(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

async function addToCart(userId, productId){
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){     // product not found in the productlist
        throw new NotFoundError("Product");
    }

    if(!product.inStock && product.quantity <= 0){
        throw new BadRequestError("Product is out of stock");
    }

    // Now may be the product is already in the cart(then increase its quantity) otherwise push it into the cart.items
    let foundProduct = false;
    cart.items.forEach(item => {
        if(item.product._id == productId){    // as cart.product is an object and productId is string
            if(product.quantity >= item.quantity + 1)
                item.quantity += 1;
            else{
                throw new AppError("The qunatity of the item requested is not available",404);
            }
            foundProduct = true;
        } 
    });
    // if product is not found in the cart
    if(!foundProduct){
        cart.items.push({
            product: productId,
            quantity: 1
        });
    }
    // to save the changes in updated cart of the user
    await cart.save();

    return cart;
}

module.exports = {
    getCart,
    addToCart
}