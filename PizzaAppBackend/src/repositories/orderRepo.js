const Order = require("../schema/orderSchema");
const BadRequestError = require("../utils/badRequest");

async function createNewOrder(orderDetails){
    try{
        const order = await Order.create(orderDetails);
        return order;
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

module.exports = {
    createNewOrder
}