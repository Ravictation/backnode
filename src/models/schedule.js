const model = {}
const db = require('../config/db')


model.getAllSchedule = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.schedule ORDER BY schedule_id DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((error) => {
                console.log("something wrong when querying data")
                reject(error)
            })
    })
}

model.addSchedule = ({ movie_id, start_time, end_time, studio, ticket_price }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.schedule (movie_id, start_time, end_time, studio, ticket_price) VALUES($1, $2, $3, $4, $5)`, [movie_id, start_time, end_time, studio, ticket_price])
            .then((res) => {
                resolve(`${res.rowCount} data row added`)
            })
            .catch((error) => {
                console.log("No row was updated, Correct the error and retry")
                reject(error)
            })
    })
}

model.updateSchedule = async ({ studio, available_seats, schedule_id}) => {
    return new Promise ((resolve, reject) => {
        db.query(`UPDATE public.schedule SET studio = $1, available_seats = $2 WHERE schedule_id = $3; `,
            [studio, available_seats, schedule_id]
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

    model.deleteSchedule = async ({schedule_id}) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM public.schedule WHERE schedule_id = $1;`, [schedule_id])
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