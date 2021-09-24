const { Item } = require('../models/index');

class ItemController {
  static activateStatus(req, res) {
    Item.update(
      {
        isActive: true
      },
      {
        where: {
          id: req.params.itemId
        }
      }
    )
      .then(() => res.redirect('/seller'))
      .catch((err) => res.send(err));
  }

  static inactivateStatus(req, res) {
    Item.update(
      {
        isActive: false
      },
      {
        where: {
          id: req.params.itemId
        }
      }
    )
      .then(() => res.redirect('/seller'))
      .catch((err) => res.send(err));
  }
}

module.exports = ItemController;
