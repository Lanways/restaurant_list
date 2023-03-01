const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/Restaurant')
// 載入bodyparser
const bodyParser = require('body-parser')
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


//render partial template 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(err => console.log(error))
})
// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 新增餐廳
app.post('/restaurants', (req, res) => {
  console.log(req.body)
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(error))
})

//show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('restaurant_id', req.params.restaurant_id)
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id === Number(req.params.restaurant_id)
  })
  console.log(restaurant)
  res.render('show', { restaurant })
})

//querystring
app.get("/search", (req, res) => {
  console.log("req keyword", req.query.keyword)
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword: req.query.keyword })
})
//監聽並啟動伺服器
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})