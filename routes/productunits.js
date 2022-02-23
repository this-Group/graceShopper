const express = require( 'express');
const { 
    createProductUnits,
    getProductUnits,
    deleteProductUnits,
 } = require ('../db/productunits')

const productUnitsRouter = express.Router();


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

productUnitsRouter.delete('/', async (req, res, next) => {
    const  {id}  = req.body;
    try {
        
        const deletedProductUnits = await deleteProductUnits(id);

        res.send(deletedProductUnits);
    } catch (error) {
        return next(error);
    }
});

module.exports = productUnitsRouter;