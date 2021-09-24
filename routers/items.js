const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');

const isLogin = require('../middlewares/isLogin');
const isBuyer = require('../middlewares/isBuyer');
const isVerificated = require('../middlewares/isVerificated');

router.get('/', BuyerController.showAllItem);

router.get('/:itemId', BuyerController.showDetailItem);

router.get('/:itemId/add', isLogin, isVerificated, isBuyer, BuyerController.addToCart);

module.exports = router;