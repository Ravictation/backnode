const express = require ('express')
const route = express.Router()
const ctrlBooking = require ('../controllers/booking')

route.get("/", ctrlBooking.getData)
route.post("/", ctrlBooking.saveData)
route.put("/", ctrlBooking.updateData)
route.delete("/:booking_id", ctrlBooking.deleteData)

module.exports = route