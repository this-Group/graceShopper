const express = require('express');
const { Router } = require('express');
const ordersRouter = express.Router();

const  {
    createOrder,
    deleteOrder
} = require ("../db/orders")
// rte for create productunit- post req
//// grab orderid, price, productid

ordersRouter.post('/productunits,' async (req, res, next) => {
    try {
        
    } catch (error) {
        return next(error)
    }
})

ordersRouter.post('/myorders', async (req, res, next) => {
    try {
        // verify current user 
        //const currentUser: getUser()
        
        const orders = await createOrder(userId);
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