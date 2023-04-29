const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增餐廳
router.post('/', (req, res) => {
  // console.log(req.body)
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//show page 瀏覽特定餐廳
router.get('/:restaurant_id', (req, res) => {
  // console.log(req.params)
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

//更新餐廳
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant.set(req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router