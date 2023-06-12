const ctrlSchedule = {}

const models = require('../models/schedule')

ctrlSchedule.getData = async (req, res) => {
    try{
        const result = await models.getAllSchedule()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlSchedule.saveData = async (req, res) => {
    try{
        const {movie_id, start_time, end_time, studio, ticket_price} = req.body
        const result = await models.addSchedule({movie_id, start_time, end_time, studio, ticket_price})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlSchedule.updateData = async (req, res) => {
    try{
        const {studio, available_seats, schedule_id} = req.query
        const result = await models.updateSchedule({studio, available_seats, schedule_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlSchedule.deleteData = async (req, res) => {
    try {
        const schedule_id = req.params.schedule_id
        const result = await models.deleteSchedule({schedule_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)  
    }
}


module.exports = ctrlSchedule