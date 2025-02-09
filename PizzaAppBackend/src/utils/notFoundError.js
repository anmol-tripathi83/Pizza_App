const AppError = require("./appError");

class NotFoundError extends AppError {
    constructor(properties, resource){
        // properties jo nhi mili(in the form of array)

        let notFoundProperties = "";
        properties.forEach(property => notFoundProperties += `${property} , `);

        super(`Not able to find properties: ${notFoundProperties} for the resources ${resource}`, 404);
    }
}

module.exports = NotFoundError;