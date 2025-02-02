const multer = require('multer');    // return a function

const uploader = multer({     // this is function we got after requiring multer which will return a middleware on calling and it require dest(destination) as argument where you want to store data(upload folder for now) which will came through uploader
    dest: 'uploads/',
});

module.exports = uploader;