const express = require('express');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const db = require('./config/database');
const cloudinary = require('./config/cloudinary');
const Upload = require('./routes/FileUpload');

const app = express();

let PORT = process.env.PORT;

app.use(express.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));



// app.use(fileUpload());

db.connect();

cloudinary.cloudinaryConnect();

app.use('/api/v1/upload', Upload);






app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})








