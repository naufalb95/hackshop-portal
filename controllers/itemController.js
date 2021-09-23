const { Item } = require('../models/index')
class ItemController {
  static activateStatus (req, res) {
    Item.update({
      status: true
    }, {
      where: {
        id: req.params.itemId
      }
    })
    .then( data => res.redirect('/seller'))
    .catch( err => res.send(err) )
  }
  static nonactivateStatus (req, res) {
    Item.update({
      status: false
    }, {
      where: {
        id: req.params.itemId
      }
    })
    .then( data => res.redirect('/seller'))
    .catch( err => res.send(err) )
  }
}

module.exports = ItemController