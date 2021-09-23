const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');

router.get('/', BuyerController.showAllItem);

router.get('/:itemId/add', BuyerController.addToCart);

router.get('/:itemId', BuyerController.showDetailItem);

module.exports = router;