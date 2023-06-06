const express = require('express')
const route = express.Router()

const movie = require('./movie')
const booking = require('./booking')
const schedule = require('./schedule')
const search = require ('./searchMovie')

route.use('/movie', movie)
route.use('/booking', booking)
route.use('/schedule', schedule)
route.use('/search', search)

module.exports = route
    