const express = require('express')
const { create } = require('express-handlebars')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.locals.warning_msg = 'Email and Password are required'
    return res.render('login', { email })
  }
  next()
},
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  }))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'email 與密碼是必填欄。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => { //findOne指定參數為object
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))

  })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout() //Passport.js 提供的函式，會幫你清除 session
  req.flash('success_msg', 'You already log out')
  res.redirect('/users/login')
})

module.exports = router