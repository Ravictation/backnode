const ctrlBooking = {}

const models = require('../models/booking')

ctrlBooking.getData = async (req, res) => {
    try{
        const result = await models.getAllBooking()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlBooking.saveData = async (req, res) => {
    try{
        const {schedule_id, customer_name, email, phone_number, seat_number} = req.body
        const result = await models.addBooking({schedule_id, customer_name, email, phone_number, seat_number})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlBooking.updateData = async (req, res) => {
    try{
        const {schedule_id, customer_name, email, phone_number, seat_number, booking_id} = req.query
        const result = await models.updateBooking({schedule_id, customer_name, email, phone_number, seat_number, booking_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlBooking.deleteData = async (req, res) => {
    try{
        const booking_id = req.params.booking_id
        const result = await models.deleteBooking({booking_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = ctrlBooking