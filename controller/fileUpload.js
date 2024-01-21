const File = require("../model/File");
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async (req, res) => {
    try {
        // fetch file to upload
        const file = req.files.file;
        console.log("FILE AAGYI : ", file);

        // path to store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ", path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully'
        })

    } catch (error) {

    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    let options = { folder };
    options.resource_type = "auto";
    console.log("tempFilePath : ", file.tempFilePath);
    if(quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType : ", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'pls provide suitable file format jpg jpeg or png only'
            });
        }

        // file format supported hai to clodinary me pheko
        const response = await uploadFileToCloudinary(file, "UploaderPro");
        console.log(response);

        // db me entry kro
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "image succesfully uploaded"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "somthing went wrong"
        })
    }
}

exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ["mov", "mp4", "mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType : ", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'pls provide suitable file format mov mp4 or mkv'
            });
        }

        // file format supported hai to clodinary me pheko
        const response = await uploadFileToCloudinary(file, "UploaderPro");
        console.log(response);

        // db me entry kro
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            videoUrl: response.secure_url,
            message: "video succesfully uploaded"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "somthing went wrong"
        })
    }
}

exports.imageReducerUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType : ", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'pls provide suitable file format jpg jpeg or png'
            });
        }

        // file format supported hai to clodinary me pheko
        const response = await uploadFileToCloudinary(file, "UploaderPro", 30);
        console.log(response);

        // db me entry kro
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            videoUrl: response.secure_url,
            message: "video succesfully uploaded"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "somthing went wrong"
        })
    }
}