const isSeller = (req, res, next) => {
  if (req.session.role === 'seller') {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = isSeller;
