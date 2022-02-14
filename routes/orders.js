const express = require('express');
const { Router } = require('express');
const ordersRouter = express.Router();

const  {
    createOrder,
    deleteOrder
} = require ("../db/orders")

ordersRouter.post('/myorders', async (req, res, next) => {
    try {
        const orders = await createOrder();
        console.log('These are current user orders', orders)
        res.status(200).send(orders);
    } catch (error) {
        return next(error);
    }
});

ordersRouter.delete('/myorders/:id', async (req, res, next) => {
    try {
        console.log(req.body)
        const id = req.params.id;
        const deletedOrder = await deleteOrder(id);

        res.send(deletedOrder);
    } catch (error) {
        return next(error);
    }
})

module.exports = ordersRouter;