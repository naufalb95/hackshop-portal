const express = require('express');

const SellerController = require('./controllers/sellerController');
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

app.set('view engine', 'ejs');
app.use(express.urlencoded({ express: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const data = {
    bgImg: null
  }
  data.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg.jpg');
  
  res.render('index', { title: 'HackShop Portal', data });
});

app.get('/seller', (req, res) => {
  res.render('seller/');
})

app.get('/seller/items', (req, res) => {
  const data = {
    id: 1,
    name: 'Keyboard',
    price: 500000,
    stock: 1,
    isActive: true,
    imageUrl: 'tag'
  }
  res.render('seller/lists', { title: 'Item Lists', item: data });
});

app.get('/seller/items/:itemId/edit', (req, res) => {
  const { itemId } = req.params;

  const data = {
    id: itemId,
    name: 'Keyboard',
    price: 500000,
    stock: 1,
    isActive: true,
    imageUrl: ''
  }

  res.render('seller/edit', { title: 'Edit', item: data });
});

app.post('/seller/items/:itemId/edit', upload.single('myfile'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
});

app.get('/seller/items/:itemId/delete', (req, res) => {
  const { itemId } = req.params;

  res.send(`/seller/items/${itemId}/delete`);
});

app.get('/seller/add', (req, res) => {
  res.render('seller/add')
});

app.post('/seller/add', upload.single('imageUrl'), (req, res) => {
  res.redirect('/seller/items');
});

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
