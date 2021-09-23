const { Item, User, Cart } = require('../models/index');
const Op = require('sequelize').Op;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const formatDate = require('../helpers/formatDate');

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

    let search = {where: {}, order: [['createdAt', 'DESC']]}
    let keyword = req.query.search

    let querySearch = req.query.search;

    if (keyword) {
      search.where.name = {[Op.iLike] : `%${keyword}%`}
    }
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

        data = Item.filterIsActive(data)
        
        const loginObj = {
          userId: req.session.userId,
          role: req.session.role
        }

        res.render('buyer/', { items: data, querySort: querySort, querySearch: querySearch, loginObj, dataAssets });
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
        
        const loginObj = {
          userId: req.session.userId,
          role: req.session.role
        }

        res.render('buyer/detail', { item: data, loginObj, dataAssets, formatDate });
      })
      .catch((err) => res.send(err));
  }

  static addToCart(req, res) {
    const { userId } = req.session;

    Cart.create({
      UserId: userId, // must be replace with session
      ItemId: req.params.itemId
    })
      .then(() => {res.redirect('/items')})
      .catch((err) => res.send(err));
  }

  static deleteFromCart(req, res) {
    const { userId } = req.session;
    const { itemId } = req.params;

    Cart.destroy({
      where: { ItemId: itemId, UserId: userId }
    })
      .then(() => {
        res.redirect('/cart')
      })
      .catch((err) => res.send(err));
  }

  static showCart(req, res) {
    const { userId } = req.session;

    User.findByPk(userId, {
      include: [Item]
    })
      .then((data) => {
        let filtered = Item.filterIsActive(data.Items)

        const loginObj = {
          userId: req.session.userId,
          role: req.session.role
        }

        res.render('cart', { items: filtered, loginObj, dataAssets })
      })
      .catch((err) => {
        res.render(err);
      });
  }

  static checkOut(req, res) {
    const { userId } = req.session;
    let itemKey = [];

    Cart.findAll({
      where: {
        UserId: userId
      }
    })
      .then ((data) => {
        data.forEach((el) => {
          itemKey.push(el.ItemId)
        })
        return Item.findAll({
          where: {
            id: itemKey,
            isActive: true,
            stock: {[Op.gt]: 0}
          }
        })
      })
      .then((data) => {
        let temp = []
        data.forEach((el) => {
          temp.push(el.id);
        });

        itemKey = temp

        return Item.decrement('stock', {
          where: {
            id: itemKey
          }
        })
      })
      .then(() => {
        console.log(itemKey)
        return Cart.destroy({
          where: {
            UserId: userId,
            ItemId: itemKey
          }
        })
      })
      .then(() => {
        res.redirect('/items');
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = BuyerController;
