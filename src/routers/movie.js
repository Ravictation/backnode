const express = require ('express')
const route = express.Router()
const ctrlMovie = require ('../controllers/movie')
const authCheck = require ('../middleware/autchCheck')
const upload = require('../middleware/upload')

route.get("/", authCheck, ctrlMovie.getData)
route.post("/",authCheck, upload.single('image'), ctrlMovie.saveData)
route.put("/", ctrlMovie.updateData)
route.delete("/:movie_id", ctrlMovie.deleteData)

module.exports = route