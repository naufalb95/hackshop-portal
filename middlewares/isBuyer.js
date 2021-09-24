const isBuyer = (req, res, next) => {
  if (req.session.role === 'buyer') {
    next();
  } else {
    res.redirect('/seller');
  }
};

module.exports = isBuyer;
