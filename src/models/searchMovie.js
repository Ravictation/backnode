const model = {}
const db = require('../config/db')


model.searchMovie = async ({title}) => {
    return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM public.movie WHERE title iLIKE $1', [`%${title}%`])
        .then((res)=>{
            resolve(res.rows)
        })
        .catch((error)=>{
            console.log("Oops, something went wrong with your query, please specify search criteria")
            reject(error)
        })

    })
}

model.queryMovie = async () => {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT title, release_date FROM public.movie ORDER BY title, release_date`)
        .then((res)=>{
            resolve(res.rows)
        })
        .catch((error)=>{
            console.log("Oops, something went wrong with your query, please specify search criteria")
            reject(error)
        })

    })
}


module.exports = model