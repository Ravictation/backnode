const express = require ('express')
const route = express.Router()
const ctrlMovie = require ('../controllers/movie')

route.get("/", ctrlMovie.getData)
route.post("/", ctrlMovie.saveData)
route.put("/", ctrlMovie.updateData)
route.delete("/:movie_id", ctrlMovie.deleteData)

module.exports = route