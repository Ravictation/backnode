const express = require('express')
const route = express.Router()
const cors = require('cors');

const movie = require('./movie')
const booking = require('./booking')
const schedule = require('./schedule')
const search = require ('./searchMovie')
const users = require ('./users')
const auth = require ('./auth')

route.use('/movie', movie)
route.use('/booking', booking)
route.use('/schedule', schedule)
route.use('/search', search)
route.use('/users', users)
route.use('/auth', auth)
route.use(cors());

module.exports = route
    