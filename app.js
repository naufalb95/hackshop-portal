const express = require('express');

const SellerController = require('./controllers/sellerController');
const BuyerController = require('./controllers/buyerController');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const port = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: "dbktyem00",
  api_key: "424256335419546",
  api_secret: "-cmA_6jrXw82HDUlhMmTDk1HBLs"
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
}
dataAssets.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg.jpg');
dataAssets.fbImg = cloudinary.url('HackShop-Portal/assets/facebook.svg');
dataAssets.fsImg = cloudinary.url('HackShop-Portal/assets/friendster.svg');
dataAssets.igImg = cloudinary.url('HackShop-Portal/assets/instagram.svg');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ express: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'HackShop Portal', dataAssets });
});

app.get('/seller', (req, res) => {
  res.render('seller/', { dataAssets });
})

app.get('/seller/items', SellerController.showAll);

app.get('/seller/items/:itemId/edit', SellerController.showEditItem);

app.post('/seller/items/:itemId/edit',  SellerController.editItem);

app.get('/seller/items/:itemId/delete', SellerController.deleteItem);

app.get('/seller/add', SellerController.showAddItemForm);

app.post('/seller/add', upload.single('imageUrl'), SellerController.createItem);

app.get('/seller/items/:itemId/detail', (req, res) => {
  const { itemId } = req.params;
  
  const data = {
    id: itemId,
    name: 'Keyboard',
    price: 500000,
    stock: 1,
    isActive: true,
    imageUrl: ''
  }
});

// app.get('/buyer', BuyerController._);
// app.get('/buyer/:buyerid/cart', BuyerController._);
// app.get('/buyer/:cartid/checkout', BuyerController._);
// app.get('/buyer/:buyerid/editprofile', BuyerController._);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
