const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const session = require('express-session');

const routes = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

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

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'hackshop-portallll',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});