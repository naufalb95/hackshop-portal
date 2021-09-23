const showDateItemPost = require('../helpers/formatDate')
const { User, UserData, Item } = require('../models/index')

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
}
dataAssets.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg.jpg');
dataAssets.fbImg = cloudinary.url('HackShop-Portal/assets/facebook.svg');
dataAssets.fsImg = cloudinary.url('HackShop-Portal/assets/friendster.svg');
dataAssets.igImg = cloudinary.url('HackShop-Portal/assets/instagram.svg');

class SellerController {
  static showAll(req, res) {
    const data = {
      id: 1,
      name: 'Keyboard',
      price: 500000,
      stock: 1,
      isActive: true,
      imageUrl: ''
    }
    
    res.render('./seller/lists', {item: data, dataAssets})
    // Item.findAll({
    //   where: {
    //     UserId: 2 // replace this UserId value with session
    //   }
    // })
    // .then( data => {
    //   data.forEach( element => {
    //     element.createdAt = showDateItemPost(element.createdAt)
    //   })
    //   res.render('./seller/index', {item: data, dataAssets})
    // })
    // .catch( err => res.send(err) )
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
    res.render('./seller/add')
  }
  static createItem (req, res) {
    let { name, price, stock, imageUrl, description} = req.body
    console.log(description)
    Item.create({
      name,
      price,
      stock,
      isActive: true,//isActive filled with hooks
      imageUrl,
      UserId: 1,//userId filled with session
      description
    })
    .then( data => res.redirect('/seller/items') )
    .catch( err => res.send(err) )

  }
  static showEditItem(req, res) {
    const data = {
      id: 1,
      name: 'Keyboard',
      price: 500000,
      stock: 1,
      isActive: true,
      imageUrl: ''
    }
    
    res.render('./seller/edit', {item: data, dataAssets})
    // Item.findOne({
    //   where: {
    //     id: req.params.itemId
    //   }
    // })
    // .then ( data => res.render('./seller/edit', {item: data}))
    // .catch( err => res.send(err) )
  }

  static editItem (req, res) {
    let { name, price, stock, imageUrl, description } = req.body
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
    .then( data => res.redirect('/seller/items') ) 
    .catch( err => res.send(err) )
  }
}

module.exports = SellerController