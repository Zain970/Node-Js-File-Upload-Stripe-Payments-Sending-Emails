const { StatusCodes } = require("http-status-codes")
const path = require("path");
const CustomError = require("../errors/index");
const cloudinary = require("cloudinary").v2
const fs = require("fs");


const uploadProductImageLocal = async (req, res) => {

    // 1).Check if file exists
    if (!req.files) {
        throw new CustomError.BadRequestError("No file Uploaded");
    }
    // NOW GETTING THE IMAGE THAT IS UPLOADED
    const productImage = req.files.img;

    // THAT OBJECT
    console.log("Product Image : ", productImage);

    // 2).Check format
    if (!productImage.mimetype.startsWith("image")) {

        throw new CustomError.BadRequestError("Please upload image");

    }
    // 3).SPECIFYING THE IMAGE MAX SIZE
    const maxSize = 80000;

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError("Please upload image smaller then 1kb");
    }


    // MOVING THE IMAGE TO OUR DESIRED PATH
    const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`)
    await productImage.mv(imagePath);


    // SENDING THE RESPONSE
    res.status(StatusCodes.OK).json({
        image: {
            src: `/uploads/${productImage.name}`
        }
    })
}

const uploadProductImage = async (req, res) => {

    console.log("---> : ", req.files.img);

    // UPLOADING IMAGE ON THE CLOUDINARY
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: "file-upload"
    })

    // 1).DELETING THE FILE WHICH IS CREATED IN tmp FOLDER
    // 2).SENDING THE FILES TO THE CLOUDINARY BUT NOT STORING THEM LOCALLY
    fs.unlinkSync(req.files.image.tempFilePath);

    // SENDING THE RESPONSE CONTAINING THE PATH WHERE THE IMAGE IS SAVED
    res.status(StatusCodes.OK).json({
        image: {
            src: `${result.secure_url}`
        }
    })
};

module.exports = {
    uploadProductImageLocal,
    uploadProductImage
}