const express = require('express');
const { Router } = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductById
 } = require("../db/products")

 //GET ALL PRODUCTS

productsRouter.get("/", async (req, res, next) => {
  
  try {
    const products = await getAllProducts();
    console.log('these are products', products)
    res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
});

//SINGLE PRODUCT BY ID

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId);

    res.status(200).send(product);
  } catch (error) {
    return next(error);
  }
});

module.exports = productsRouter;