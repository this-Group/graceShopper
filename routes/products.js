const express = require('express');
const { Router } = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    getProductByGenre
 } = require("../db/products")

 //GET ALL PRODUCTS

productsRouter.get("/", async (req, res, next) => {
  console.log('TEST TEST')
  try {
    console.log("beginning of products get handler")
    const products = await getAllProducts();
    console.log('these are products', products)
    // return products
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

productsRouter.get("/genre/:genre", async (req, res, next) => {
  console.log('hello from genre router')
  const { genre } = req.params;
  console.log('genre params', genre)

  try {
    const products = await getProductByGenre(genre);

    res.status(200).send(products);
  } catch (error) {
    return next(error);
  }
});

module.exports = productsRouter;