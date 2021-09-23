const cloudinary = require('cloudinary').v2;

const { Item } = require('../models/index');

const showDateItemPost = require('../helpers/formatDate');

cloudinary.config({
  cloud_name: "dbktyem00",
  api_key: "424256335419546",
  api_secret: "-cmA_6jrXw82HDUlhMmTDk1HBLs"
});

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
    const { userId } = req.session;

    Item.findAll({
      where: {
        UserId: userId
      }
    })
      .then(data => {
        const loginObj = {
          userId: req.session.userId,
          role: req.session.role
        };

      res.render('./seller', { items: data, loginObj, dataAssets });
    })
    .catch( err => res.send(err) )
  }

  static deleteItem (req, res) {
    Item.destroy({
      where: {
        id: req.params.itemId
    }
    })
    .then( () => res.redirect('/seller'))
    .catch( err => res.send(err) )
  }

  static showAddItemForm(req, res) {
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };

    res.render('./seller/add', { loginObj, dataAssets })
  }

  static createItem (req, res) {
    const { name, price, stock, description } = req.body;
    const { userId } = req.session;
    const imageUrl = req.file.filename;

    Item.create({
      name,
      price,
      stock,
      imageUrl,
      UserId: userId,
      description
    })
    .then( () => res.redirect('/seller') )
    .catch( err => res.send(err) )

  }

  static postEditItem (req, res) {
    let { name, price, stock, description } = req.body;
    let imageUrl = req.file.filename

    // console.log({ name, price, stock, imageUrl, description })

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
    
    .then( data => {
      if (imageUrl) {
        cloudinary.uploader.destroy(data.imageUrl);
      }
      res.redirect('/seller') 
    }) 
    .catch( err => res.send(err) )
  }

  static showEditItem (req, res) {
    Item.findByPk(req.params.itemId)
      .then(data => {
        const loginObj = {
          userId: req.session.userId,
          role: req.session.role
        };

        res.render('./seller/edit', { item: data, loginObj, dataAssets })})
    .catch( err => res.send(err) )
  }
}

module.exports = SellerController