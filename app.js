const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))



//render partial template
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
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