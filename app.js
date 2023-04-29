const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const usePassport = require('./config/passport')
const routes = require('./routes')

require('./config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // 僅在非正式環境時, 使用 dotenv

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisMySecret',
  resave: 'false',
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true })) //每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method'))

usePassport(app)

//locals是express幫我們開的一條捷徑，裡面的資料所有view都可以存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
}) //監聽並啟動伺服器