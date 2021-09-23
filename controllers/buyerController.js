const { Item, User, Cart } = require('../models/index');
const Op = require('sequelize').Op;
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

class BuyerController {
  static showAllItem(req, res) {
    let querySort = req.query.sort;
    let querySearch = req.query.search;
    let search = {};

    if (querySort) {
      if (querySort === 'date-asc') search.order = [['createdAt', 'ASC']];
      else if (querySort === 'date-desc')
        search.order = [['createdAt', 'DESC']];
      else if (querySort === 'price-asc') search.order = [['price', 'ASC']];
      else if (querySort === 'price-desc') search.order = [['price', 'DESC']];
    }

    Item.findAll(search)
      .then((data) => {
        data.forEach((el) => {
          el.imageUrl = cloudinary.url(el.imageUrl);
        }); // instance method

        res.render('buyer/', { items: data, querySort: querySort, querySearch: querySearch, dataAssets });
      })
      .catch((err) => res.send(err));
  }

  static showDetailItem(req, res) {
    Item.findOne({
      where: {
        id: req.params.itemId
      },
      include: [ User ]
    })
      .then((data) => {
        data.imageUrl = cloudinary.url(data.imageUrl);
        res.render('buyer/detail', { item: data, dataAssets });
      })
      .catch((err) => res.send(err));
  }

  static addToCart(req, res) {
    Cart.create({
      UserId: 1, // must be replace with session
      ItemId: req.params.itemId
    })
      .then(() => res.redirect('/items'))
      .catch((err) => res.send(err));
  }

  static deleteFromCart(req, res) {
    Cart.destroy({ where: { id: req.params.itemId } })
      .then((data) => res.redirect('/cart'))
      .catch((err) => res.send(err));
  }

  static showCart(req, res) {
    // const id = req.session.userId; // replace saat session
    const id = 1;

    User.findByPk(id, {
      include: [Item]
    })
      .then((data) => {
        res.render('cart', { items: data.Items, dataAssets })
      })
      .catch((err) => {
        res.render(err);
      });
  }

  static checkOut(req, res) {
    let itemKey = null;

    Cart.findAll({
      where: {
        UserId: 1 //must be replace with session buyer id
      }
    })
      .then((data) => {
        itemKey = data; //uncomplete
      })
      .catch((err) => res.send(err));
  }
}

module.exports = BuyerController;
