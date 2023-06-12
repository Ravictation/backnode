const model = {}
const db = require('../config/db')


// model.getAllBooking = (username) => {
//     return new Promise((resolve, reject) => {
//         db.query(
//             `SELECT b.*
//             FROM public.booking b
//             JOIN public.users u ON b.user_id = u.user_id
//             WHERE u.username = $1`, [username]
//         )
//             .then((res) => {
//                 resolve(res.rows)
//             })
//             .catch((error) => {
//                 console.log("something wrong when querying data")
//                 reject(error)
//             })
//     })
// }

model.getAllBooking = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT b.*, s.movie_id, s.studio, s.ticket_price, m.title
            FROM public.booking b
            JOIN public.users u ON b.user_id = u.user_id
            JOIN public.schedule s ON b.schedule_id = s.schedule_id
            JOIN public.movie m ON s.movie_id = m.movie_id
            WHERE u.username ILIKE 'ravic2';`
        )
            .then((res) => {
                resolve(res.rows)
            })
            .catch((error) => {
                console.log("something wrong when querying data")
                reject(error)
            })
    })
}
model.addBooking = ({ user_id, schedule_id, seat_number, booking_date }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.booking (user_id, schedule_id, seat_number, booking_date) VALUES($1, $2, $3, $4)`, 
        [user_id, schedule_id, seat_number, booking_date])
            .then((res) => {
                resolve(`${res.rowCount} data row added`)
            })
            .catch((error) => {
                console.log("No row was updated, Correct the error and retry")
                reject(error)
            })
    })
}

model.updateBooking = async ({ schedule_id, seat_number,booking_id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE public.booking SET schedule_id = $1, seat_number = $2 WHERE booking_id = $3`,
            [schedule_id, seat_number, booking_id]
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