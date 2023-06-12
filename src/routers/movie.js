const express = require ('express')
const route = express.Router()
const ctrlMovie = require ('../controllers/movie')
const authCheck = require ('../middleware/autchCheck')
const upload = require('../middleware/upload')

//admin and users can access
route.get("/", authCheck ('admin','user'), ctrlMovie.getData)

//only admin can access
route.post("/",authCheck('admin'), upload.single('image'), ctrlMovie.saveData)

//only admin can access
route.put("/",authCheck('admin'), ctrlMovie.updateData)
route.delete("/:movie_id", ctrlMovie.deleteData)

module.exports = route