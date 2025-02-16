const Cart = require("../schema/cartSchema");

async function createCart(userId){
    try{
        const newCart = await Cart.create({
            user: userId,
        });
        return newCart;
    } catch(error){ 
        if(error.name == 'ValidationError'){    // sent by mongoose(when req info is not sent to the schema..)
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

module.exports = {
    createCart
}