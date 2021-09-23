const express = require('express');

// const SellerController = require('./controllers/sellerController');
const BuyerController = require('./controllers/buyerController');
// const AccountController = require('./controllers/accountController');
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

// app.get('/', (req, res) => {
//   res.render('index', { title: 'HackShop Portal', dataAssets });
// });

// app.get('/seller', isLogin, SellerController.showAll);

// app.get('/seller/items/:itemId/edit', SellerController.showEditItem);

// app.post('/seller/items/:itemId/edit', upload.single('imageUrl'), SellerController.postEditItem);

// app.get('/seller/items/:itemId/delete', SellerController.deleteItem);

// app.get('/seller/add', SellerController.showAddItemForm);

// app.post('/seller/add', upload.single('imageUrl'), SellerController.createItem);

// app.get('/items', BuyerController.showAllItem);
// app.get('/items/:itemId/add', BuyerController.addToCart);
// app.get('/cart', BuyerController.showCart);
// app.get('/checkout', BuyerController.checkOut);
// app.get('/items/:itemId', BuyerController.showDetailItem);
// app.get('/cart/:itemId/delete', BuyerController.deleteFromCart);

// app.get('/login', (req, res) => {
//   const loginObj = {
//     userId: req.session.userId,
//     role: req.session.role
//   };

//   res.render('login', { errors: [], loginObj, dataAssets });
// });

// app.get('/register', (req, res) => {
//   res.render('register', { errors: [], dataAssets });
// });

// app.get('/profile', (req, res) => {
//   res.render('edit_profile', { errors: [], dataAssets });
// });

// app.post('/register', AccountController.createAccount);

// app.post('/login', AccountController.checkLogin);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});