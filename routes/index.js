const apiRouter = require('express').Router();
const morgan = require('morgan');
const { append } = require('express/lib/response');
const productsRouter = require('./products')
const userRouter = require('./users');
const ordersRouter = require('./orders');
const productUnitsRouter = require('./productunits');

apiRouter.use(morgan("dev"));

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/products', productsRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/myorders', ordersRouter);

apiRouter.use("/productunits", productUnitsRouter);

module.exports = apiRouter;
