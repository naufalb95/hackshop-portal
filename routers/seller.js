const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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


const isLogin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isSeller = (req, res, next) => {
  if (req.session.role === 'seller') {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/', isLogin, isSeller, SellerController.showAll);

router.get('/items/:itemId/edit', isLogin, isSeller, SellerController.showEditItem);

router.post('/items/:itemId/edit', isLogin, isSeller, upload.single('imageUrl'), SellerController.postEditItem);

router.get('/items/:itemId/delete', isLogin, isSeller, SellerController.deleteItem);

router.get('/items/:itemId/activate', isLogin, isSeller, ItemController.activateStatus);

router.get('/items/:itemId/inactivate', isLogin, isSeller, ItemController.inactivateStatus);

router.get('/add', isLogin, isSeller, SellerController.showAddItemForm);

router.post('/add', isLogin, isSeller, upload.single('imageUrl'), SellerController.createItem);


module.exports = router;