const express = require( 'express');

const productUnitsRouter = express.Router();

const { createProductUnits, getProductUnits } = require("../db/orders")

productUnitsRouter.get("/", async (req, res, next) => {
    try {
        console.log('checking productunits')
        const productUnits = await getProductUnits();
        // req.body;
        
        res.send(productUnits);
        console.log("API is Healthy!")
    } catch (error) {
        return next(error);
    }
})

productUnitsRouter.post('/', async (req, res, next) => {
    try {
        const {orderId, productId, price} = req.body;

        const productUnits = await createProductUnits(orderId, productId, price);
        res.status(200).send(productUnits)
    } catch (error) {
        return next(error);
    }
})

module.exports = productUnitsRouter;