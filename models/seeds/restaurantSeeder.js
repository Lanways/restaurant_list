const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    collection: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    collection: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(SEED_USERS.map((seedUser) => 
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const restaurant = seedUser.collection.map(index => {
          restaurantList[index].userId = userId
          return restaurantList[index]
        })
        return Restaurant.create(restaurant)
      })
  ))
    .then(() => {
      console.log('done')
      process.exit()
    })
})