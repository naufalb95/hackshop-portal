const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const isLogin = require('../middlewares/isLogin');
const isSeller = require('../middlewares/isSeller');
const isVerificated = require('../middlewares/isVerificated');

const SellerController = require('../controllers/sellerController');
const ItemController = require('../controllers/itemController');

cloudinary.config({
  cloud_name: 'dbktyem00',
  api_key: '424256335419546',
  api_secret: '-cmA_6jrXw82HDUlhMmTDk1HBLs'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'HackShop-Portal',
    allowedFormats: ['jpeg', 'jpg', 'png']
  }
});

const upload = multer({ storage });

router.get('/', isLogin, isVerificated, isSeller, SellerController.showAll);

router.get('/items/:itemId/edit', isLogin, isVerificated, isSeller, SellerController.showEditItem);

router.post('/items/:itemId/edit', isLogin, isVerificated, isSeller, upload.single('imageUrl'), SellerController.postEditItem);

router.get('/items/:itemId/delete', isLogin, isVerificated, isSeller, SellerController.deleteItem);

router.get('/items/:itemId/activate', isLogin, isVerificated, isSeller, ItemController.activateStatus);

router.get('/items/:itemId/inactivate', isLogin, isVerificated, isSeller, ItemController.inactivateStatus);

router.get('/add', isLogin, isVerificated, isSeller, SellerController.showAddItemForm);

router.post('/add', isLogin, isVerificated, isSeller, upload.single('imageUrl'), SellerController.createItem);

module.exports = router;