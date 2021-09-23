const showDateItemPost = require('../helpers/formatDate');
const { User, UserData, Item } = require('../models/index');

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
};

dataAssets.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg');
dataAssets.fbImg = cloudinary.url('HackShop-Portal/assets/facebook.svg');
dataAssets.fsImg = cloudinary.url('HackShop-Portal/assets/friendster.svg');
dataAssets.igImg = cloudinary.url('HackShop-Portal/assets/instagram.svg');

class SellerController {
  static showAll(req, res) {
    Item.findAll({
      where: {
        UserId: 1 // replace this UserId value with session
      }
    })
    .then( data => {
      res.render('./seller/lists', { items: data, dataAssets });
    })
    .catch( err => res.send(err) )
  }

  static deleteItem (req, res) {
    Item.destroy({
      where: {
        id: req.params.itemId
    }
    })
    .then( data => res.redirect('/seller/items'))
    .catch( err => res.send(err) )
  }

  static showAddItemForm (req, res) {
    res.render('./seller/add', { dataAssets })
  }

  static createItem (req, res) {
    const { name, price, stock, description } = req.body;
    const imageUrl = req.file.filename;

    Item.create({
      name,
      price,
      stock,
      imageUrl,
      UserId: 1, //userId filled with session
      description
    })
    .then( () => res.redirect('/seller') )
    .catch( err => res.send(err) )

  }

  static postEditItem (req, res) {
    let { name, price, stock, imageUrl, description } = req.body;
    console.log({ name, price, stock, imageUrl, description })
    Item.update({
      name,
      price,
      stock,
      imageUrl,
      description
    }, {
      where: {
        id: req.params.itemId
      } 
      
    })
    .then( data => res.redirect('/seller') ) 
    .catch( err => res.send(err) )
  }

  static showEditItem (req, res) {
    Item.findByPk(req.params.itemId)
      .then(data => 
        res.render('./seller/edit', { item: data, dataAssets }))
    .catch( err => res.send(err) )
  }
}

module.exports = SellerController