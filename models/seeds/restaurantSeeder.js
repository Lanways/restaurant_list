const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantList)
    .then(() => { console.log('done') })
    .catch(error => console.log(error))
})