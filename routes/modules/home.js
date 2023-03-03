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

module.exports = router