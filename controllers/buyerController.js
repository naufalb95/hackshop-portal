const { Item, User } = require('../models/index')
const Op = require('sequelize').Op
class BuyerController {
  static showAllItem (req, res) {
    let querySort = req.query.sort
    let search = {}
    if(querySort) {
      if(querySort == 'date-asc'){
        search.order = [['createdAt', 'ASC']]
      }
      if(querySort == 'date-desc'){
        search.order = [['createdAt', 'DESC']]
      }
      if(querySort == 'price-asc'){
        search.order = [['price', 'ASC']]
      }
      if(querySort == 'price-desc'){
        search.order = [['price', 'DESC']]
      }
    }
    Item.findAll(search)
    .then( data => res.render('./buyer/list', {items: data}))
    .catch( err => res.send(err) )
  }
  static showDetailItem (req, res) {
    Item.findOne({
      where: {
        id: req.params.itemId
      },
      include: ['UserData']
    })
    .then( data => res.render('./buyer/detail', {item: data}))
    .catch( err => res.send(err) )
  }
  static addToCart (req, res) {
    Cart.create({
      UserId: 1, // must be replace with session
      ItemId: req.params.itemId
    })
    .then( data => res.redirect('/items/:itemId'))
    .catch( err => res.send(err) )
  }
  static deleteFromcart (req, res) {
    Cart.destroy({where: {id: req.params.cartId}})
    .then( data => res.redirect('/cart'))
    .catch( err => res.send(err) )
  }
  static showItemInCart (req, res) {
    Cart.findAll()
    .then( data => res.render('./buyer/cart', {item: data}))
    .catch( err => res.send(err) )
  }
  static checkOut (req, res) {
    let itemKey;
    Cart.findAll({
      where: {
        UserId: 1, //must be replace with session buyer id
      }
    })
    .then( data => {
      itemKey = data //uncomplete
    })
    .catch( err => res.send(err) )
  }
}

module.exports = BuyerController