const apiRouter = require('express').Router();
const morgan = require('morgan');
const { append } = require('express/lib/response');
const productsRouter = require('./products')
const userRouter = require('./users')

apiRouter.use(morgan("dev"));

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.use('/products', productsRouter);

apiRouter.use('/users', userRouter)

module.exports = apiRouter;