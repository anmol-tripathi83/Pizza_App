var dotenv = require('dotenv');
dotenv.config();
// use case of this file is that it reads the configration for server file from environment variable and return them

// Here we are exporting all the env variable that the project uses
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}