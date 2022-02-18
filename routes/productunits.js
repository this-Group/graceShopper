const express = require( 'express');

const productUnitsRouter = express.Routerd();

const { createProductUnits } = require("../db/orders")

productUnitsRouter.post('/productunits', async (req, res, next) => {
    try {
        const {orderId, productId, price} = req.body;

        const productUnits = await createProductUnits(orderId, productId, price);
        res.status(200).send(productUnits)
    } catch (error) {
        return next(error);
    }
})

module.exports = productUnitsRouter;