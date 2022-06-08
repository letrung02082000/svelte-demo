const express = require('express');
const router = express.Router();
const categoryRouter = require('./category/route');
const orderRouter = require('./order/route');
const tagRouter = require('./tag/route');
const branchRouter = require('./branch/route');
const userRouter = require('./user/route');

router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/tags', tagRouter);
router.use('/branchs', branchRouter);
router.use('/user', userRouter);

module.exports = router;
