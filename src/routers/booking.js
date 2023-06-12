const express = require ('express')
const route = express.Router()
const ctrlBooking = require ('../controllers/booking')
const authCheck = require ('../middleware/autchCheck')

route.get("/",authCheck ('user','admin'), ctrlBooking.getData)
route.post("/",authCheck ('user', 'admin'), ctrlBooking.saveData)
route.put("/",authCheck('admin'), ctrlBooking.updateData)
route.delete("/:booking_id", ctrlBooking.deleteData)

module.exports = route