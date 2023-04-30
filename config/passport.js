const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy


module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  //使用 LocalStrategy 進行驗證
  passport.use(new LocalStrategy(
    //default username change to email
    { usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          // mail search
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'That email is not registered!'))
          }
          // 將使用者輸入的password經過雜湊後去資料庫做比對
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            // authenticate success 返回user資料
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
    }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)

          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ))

  // serialize/deserialize 序列化/反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean() //可能會傳進前端樣板，lean把資料庫物件轉換js原生物件
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
