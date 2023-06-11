const express = require('express')
const route = express.Router()
const ctrl = require('../controllers/searchMovie')

route.get('/title/:title', ctrl.queryMovie)
route.get('/', ctrl.getData)


module.exports = route