const ctrlBooking = {}

const response = require ('../utils/respon')
const models = require('../models/booking')

// ctrlBooking.getData = async (req, res) => {
//     try{
//         const result = await models.getAllBooking(req.user)
//         return response(res, 200, result)
//     } catch (error) {
//         console.log(error)
//     }
// }

ctrlBooking.getData = async (req, res) => {
    try{
        const result = await models.getAllBooking()
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
    }
}


ctrlBooking.saveData = async (req, res) => {
    try{
        const {user_id, schedule_id, seat_number, booking_date} = req.body
        const result = await models.addBooking({user_id, schedule_id, seat_number, booking_date})
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
    }
}

ctrlBooking.updateData = async (req, res) => {
    try{
        const {schedule_id, seat_number,booking_id} = req.query
        const result = await models.updateBooking({schedule_id, seat_number,booking_id})
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
    }
}

ctrlBooking.deleteData = async (req, res) => {
    try{
        const booking_id = req.params.booking_id
        const result = await models.deleteBooking({booking_id})
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = ctrlBooking