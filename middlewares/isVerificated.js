const { User } = require('../models');

const isVerificated = (req, res, next) => {
  User.findByPk(req.session.userId)
    .then((data) => {
      if (data.isVerificated) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = isVerificated;
