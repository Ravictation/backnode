const model = {}
const db = require('../config/db')


model.getAllBooking = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.booking ORDER BY booking_id DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((error) => {
                console.log("something wrong when querying data")
                reject(error)
            })
    })
}

model.addBooking = ({ schedule_id, customer_name, email, phone_number, seat_number }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.booking (schedule_id, customer_name, email, phone_number, seat_number) VALUES($1, $2, $3, $4, $5)`, 
        [schedule_id, customer_name, email, phone_number, seat_number])
            .then((res) => {
                resolve(`${res.rowCount} data row added`)
            })
            .catch((error) => {
                console.log("No row was updated, Correct the error and retry")
                reject(error)
            })
    })
}

model.updateBooking = async ({ schedule_id, customer_name, email, phone_number, seat_number, booking_id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.booking SET schedule_id = $1, customer_name = $2, email = $3, phone_number = $4, seat_number = $5 WHERE booking_id = $6`,
            [schedule_id, customer_name, email, phone_number, seat_number, booking_id]
            )
        .then((res)=>{
            resolve(`${res.rowCount} data row updated`)
        })
        .catch((error)=>{
            console.log("No row was updated, Correct the error and retry")
            reject(error)
        })

    })
}

model.deleteBooking = async ({booking_id}) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.booking WHERE booking_id = $1;`, [booking_id])
        .then((res) => {
            resolve(`${res.rowCount} data row deleted`)
        })
        .catch((error) => {
            console.log("No row was updated, Correct the error and retry")
            reject(error)
        })
    })

}

module.exports = model