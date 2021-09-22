const express = require('express');
const SellerController = require('./controllers/sellerController');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ express: true }));

app.get('/', (req, res) => {
  res.render('index', { title: 'HackShop Portal'});
});

app.get('/seller', SellerController.showAll);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
