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
  console.log(req.session)
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/', isLogin, SellerController.showAll);

router.get('/items/:itemId/edit', SellerController.showEditItem);

router.post('/items/:itemId/edit', upload.single('imageUrl'), SellerController.postEditItem);

router.get('/items/:itemId/delete', SellerController.deleteItem);

router.get('/items/:itemId/activate', ItemController.activateStatus);

router.get('/items/:itemId/inactivate', ItemController.inactivateStatus);

router.get('/add', SellerController.showAddItemForm);

router.post('/add', upload.single('imageUrl'), SellerController.createItem);


module.exports = router;