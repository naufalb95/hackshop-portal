const express = require('express');
const router = express.Router();

const isLogin = require('../middlewares/isLogin');
const isBuyer = require('../middlewares/isBuyer');
const isVerificated = require('../middlewares/isVerificated');

const BuyerController = require('../controllers/buyerController');
const AccountController = require('../controllers/accountController');
const IndexController = require('../controllers/indexController');

const sellerRoutes = require('./seller');
const itemsRoutes = require('./items');

router.get('/', IndexController.getIndex);

router.get('/login', AccountController.getLogin);

router.post('/login', AccountController.checkLogin);

router.get('/logout', AccountController.getLogout);

router.get('/register', AccountController.getRegister);

router.post('/register', AccountController.createAccount);

router.get('/profile', isLogin, isVerificated, AccountController.getProfile);

router.post('/edit', AccountController.postEditUser);

router.get('/cart', isLogin, isVerificated, isBuyer, BuyerController.showCart);

router.get('/cart/:itemId/delete', isLogin, isVerificated, isBuyer, BuyerController.deleteFromCart);

router.get('/checkout', isLogin, isVerificated, isBuyer, BuyerController.checkOut);

router.get('/verificate', AccountController.verification);

router.use('/seller', sellerRoutes);

router.use('/items', itemsRoutes);

module.exports = router;