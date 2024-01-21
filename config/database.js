const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedToplogy: true
    })
    .then(console.log("DB CONNECTION SUCCESS"))
    .catch((err) => {
        console.log("DB CONNECTION FAILED");
        console.error(err);
        process.exit(1);
    })
}