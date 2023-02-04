const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");


const createProduct = async (req, res) => {

    console.log("Body : ", req.body);

    // CREATING A NEW PRODUCT
    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({
        product
    })
}

const getAllProducts = async (req, res) => {

    // GETTING ALL THE PRODUCTS
    const products = await Product.find({})

    res.status(StatusCodes.OK).json({ products })
}

module.exports = {
    createProduct,
    getAllProducts
}