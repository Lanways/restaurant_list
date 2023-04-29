module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) { //Passport函式 回傳true/false
      return next()
    }
    req.flash('warning_msg', 'Please login then use！')
    res.redirect('/users/login')
  }
}