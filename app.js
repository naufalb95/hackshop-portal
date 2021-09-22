const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ express: true }));

app.get('/', (req, res) => {
  res.render('index', { title: 'HackShop Portal'});
});

app.get('/seller', (req, res) => {
  res.render('seller/', { title: 'Item Lists' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
