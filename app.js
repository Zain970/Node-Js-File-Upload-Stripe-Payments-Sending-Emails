const dotenv = require('dotenv')
dotenv.config();
require('express-async-errors');

// EXPRESS
const express = require('express');

// INITIALIZING OUR EXPRESS APP
const app = express();

const fileUpload = require("express-fileupload");

// USE V2
const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// DATABASE
const connectDB = require('./db/connect');

// PRODUCT ROUTER
const productRouter = require("./routes/productRoutes");

// ERROR HANDLERS
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



// SERVING THE STATIC PUBLIC DIRECTORY
app.use(express.static("./public"))
// ACCESS TO DATA IN req.body
app.use(express.json());
// PARAMETER : IMAGE TEMPORARY STORAGE
app.use(fileUpload({ useTempFiles: true }));




app.use("/api/v1/products", productRouter);


// MIDDLEWARES
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {

    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log("Server is listening on port ", port);
    })

  }
  catch (error) {

    console.log(error);

  }
};

start();
