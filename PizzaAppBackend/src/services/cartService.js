const { getCartBYUserId } = require("../repositories/cartRepo");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart = await getCartBYUserId(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

module.exports = {
    getCart
}