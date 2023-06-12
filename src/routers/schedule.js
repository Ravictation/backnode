    const express = require ('express')
    const route = express.Router()
    const ctrlSchedule = require ('../controllers/schedule')
    const authCheck = require ('../middleware/autchCheck')

    route.get("/", ctrlSchedule.getData)
    route.post("/",authCheck('admin'), ctrlSchedule.saveData)
    route.put("/", authCheck('admin'), ctrlSchedule.updateData)
    route.delete("/:schedule_id", authCheck('admin'), ctrlSchedule.deleteData)

    module.exports = route