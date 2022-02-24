const express = require('express');
const { Router } = require('express');
const ordersRouter = express.Router();

const  {
    createOrder,
    deleteOrder,
    updateOrderStatus,
    getOrders,
    getOrderByOrderID,
    getOrderByUserId,
} = require ("../db/orders")

ordersRouter.get('/:userId', async (req, res, next) => {
    const userId = req.params;
    console.log('this is userid id', userId.id);
    try {
        
        const orders = await getOrderByUserId(userId.userId);
        console.log('get my orders', orders);
        res.status(200).send(orders)
    } catch (error) {
        return next(error);
    }
})
ordersRouter.get('/myorders/:id', async (req, res, next) => {
    const id = req.params;
    console.log('this is oderid id', id.id);
    console.log("oderId from the body", id)
    try {
        
        const orderByOrderId = await getOrderByOrderID(id.id);
        console.log("order from giet order by oderId", orderByOrderId)
        res.send(200).send(orderByOrderId);
    } catch (error) {
        return next(error);
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
ordersRouter.patch('/myorders', async(req, res, next) => {
        const {orderId, status, userId} = req.body
    try {
        console.log('orders patch ok')
        const updatedOrder = updateOrderStatus(orderId, status);
        const newStatus = "In Cart"
        const newOrder = await createOrder ( userId, newStatus )
        console.log("newOrder from order patch", newOrder)
        res.send(newOrder)
    } catch (error) {
        return next (error)
    }
})
module.exports = ordersRouter;