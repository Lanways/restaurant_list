const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增餐廳
router.post('/', (req, res) => {
  console.log(req.body)
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(error))
})

//show page 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  // const {變量} = 解構賦值（destructuring assignment）
  const { restaurant_id } = req.params
  console.log(req.params)
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
  // const restaurant = restaurantList.results.find((restaurant) => {
  //   return restaurant.id === Number(req.params.restaurant_id)
  // })
  // res.render('show', { restaurant })
})

// 編輯餐廳頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const { restaurant_id } = req.params
  console.log(req.params)
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

//更新餐廳
router.put('/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  const newUserData = req.body
  return Restaurant.findById(restaurant_id)
    .then((restaurant) => {
      restaurant.set(newUserData)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurant_id}`))
    .catch(err => console.log(err))
})

//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  return Restaurant.findById(restaurant_id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//querystring 尋找餐廳
router.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }
  console.log('req.query', req.query)
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantData => {
      const filterRestaurantData = restaurantData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantData: filterRestaurantData, keywords })
    })
    .catch(err => console.log(err))
  // console.log("req keyword", req.query.keyword)
  // const restaurants = restaurantList.results.filter((restaurant) => {
  //   return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  // })
  // res.render('index', { restaurants, keyword: req.query.keyword })
})

module.exports = router