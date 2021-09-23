const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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

const dataAssets = {
  bgImg: null,
  fsImg: null,
  fbImg: null,
  igImg: null
};

dataAssets.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg.jpg');
dataAssets.fbImg = cloudinary.url('HackShop-Portal/assets/facebook.svg');
dataAssets.fsImg = cloudinary.url('HackShop-Portal/assets/friendster.svg');
dataAssets.igImg = cloudinary.url('HackShop-Portal/assets/instagram.svg');

class IndexController {
  static getIndex(req, res) {
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };

    res.render('index', { title: 'HackShop Portal', loginObj, dataAssets });
  }

  static getLogin(req, res) {
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };
  
    res.render('login', { errors: [], loginObj, dataAssets });
  }

  static getLogout(req, res) {
    req.session.destroy();
  
    res.redirect('/');
  }

  static getRegister(req, res) {
    const { errors } = req.query;
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };

    let errorLists = [];
    if (errors) errorLists = errors.split(',');

    res.render('register', { errors: errorLists, loginObj, dataAssets });
  }

  static getProfile(req, res) {
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    }
    
    res.render('edit_profile', { errors: [], loginObj, dataAssets });
  }
}

module.exports = IndexController;