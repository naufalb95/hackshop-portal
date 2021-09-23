const showDateItemPost = require('../helpers/formatDate')
const { User, UserData, Item } = require('../models/index')

class SellerController {
  static showAll (req, res) {
    Item.findAll({
      where: {
        UserId: 2 // replace this UserId value with session
      }
    })
    .then( data => {
      data.forEach( element => {
        element.createdAt = showDateItemPost(element.createdAt)
      })
      res.render('./seller/index', {item: data})
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
  static showEditItem (req, res) {
    Item.findOne({
      where: {
        id: req.params.itemId
      }
    })
    .then ( data => res.render('./seller/edit', {item: data}))
    .catch( err => res.send(err) )
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