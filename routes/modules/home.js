const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')
//render partial template 瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(err => console.log(error))
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

