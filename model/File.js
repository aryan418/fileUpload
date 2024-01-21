const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
    tags: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    }
});


// post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("doc : ", doc);

        // transporter
        let transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD
            }
        })
        console.log("transporter : ", transporter);

        // send mail
        let info = await transporter.sendMail({
            from: `FileUploaderPro by Aryan Bharat`,
            to: doc.email,
            subject: "Testing Mail For FileUpload Application On CLOUDINARY By ARYAN BHARAT",
            html: `<h3>Hello g, Aryan here</h3> 
            <p>TESTING MAIL</p>
            <p>${doc.imageUrl}</p>`,
        });
        console.log("info : ", info);

    } catch (error) {
        console.log("Error in transporter : ", error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;