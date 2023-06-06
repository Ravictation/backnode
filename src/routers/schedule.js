    const express = require ('express')
    const route = express.Router()
    const ctrlSchedule = require ('../controllers/schedule')

    route.get("/", ctrlSchedule.getData)
    route.post("/", ctrlSchedule.saveData)
    route.put("/", ctrlSchedule.updateData)
    route.delete("/:schedule_id", ctrlSchedule.deleteData)

    module.exports = route