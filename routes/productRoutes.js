const express = require("express");

const productRouter = express.Router();

const
    {
        createProduct,
        getAllProducts } = require("../controllers/productController")

const { uploadProductImage, uploadProductImageLocal } = require("../controllers/uploadsController");


// MY ROUTES 
productRouter.route("/").post(createProduct).get(getAllProducts);
productRouter.route("/uploads").post(uploadProductImageLocal);

module.exports = productRouter;