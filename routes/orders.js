const express = require('express');
const { Router } = require('express');
const ordersRouter = express.Router();

const  {
    createOrder,
    deleteOrder,
    getOrders,
    getOrderByOrderID
} = require ("../db/orders")
// rte for create productunit- post req
//// grab orderid, price, productid

ordersRouter.get('/myorders', async (req, res, next) => {
    try {
        const orders = await getOrders();
        console.log('get all orders', orders);
        res.status(200).send(orders)
    } catch (error) {
        return next(error)
    }
})
ordersRouter.get('/myorders/:id', async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = getOrderByOrderID(orderId);
        res.send(200).send(order);
    } catch (error) {
        console.error(error);
    }
})

ordersRouter.post('/myorders', async (req, res, next) => {
    try {
        // verify current user 
        //const currentUser: getUser()
        
        const order = await createOrder(userId);
        console.log('These are current user orders', order)
        res.status(200).send(order);
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