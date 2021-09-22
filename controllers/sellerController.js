const { User, UserData, Item } = require('../models/index')

class SellerController {
  static showAll (req, res) {
    Item.findOne({
      where: {
        UserId: 2 // replace this UserId value with session
      }
    })
    .then( data => res.render('./seller/index', {item: data}) )
    .catch( err => res.send(err) )
  }
}

module.exports = SellerController