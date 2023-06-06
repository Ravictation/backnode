const model = {}
const db = require('../config/db')


model.getAllMovie = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.movie ORDER BY movie_id DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((error) => {
                console.log("something wrong when querying data")
                reject(error)
            })
    })
}

model.addMovie = ({ title, release_date, duration, director, casts, genre_id }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.movie (title, release_date, duration, director, casts, genre_id) VALUES($1, $2, $3, $4, $5, $6)`, [title, release_date, duration, director, casts, genre_id])
            .then((res) => {
                resolve(res.rowCount)
            })
            .catch((error) => {
                console.log("No row was updated, Correct the error and retry")
                reject(error)
            })
    })
}

model.updateMovie = async ({movie_id, release_date, genre_id}) => {
    return new Promise ((resolve, reject) => {
        db.query(`UPDATE public.movie SET release_date = $1, genre_id = $2 WHERE movie_id = $3; `,
            [release_date, genre_id, movie_id]
            )
        .then((res)=>{
            resolve(res.rowCount)
        })
        .catch((error)=>{
            console.log("No row was updated, Correct the error and retry")
            reject(error)
        })

    })
}

model.deleteMovie = async ({movie_id}) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM public.movie WHERE movie_id = $1;`, [movie_id])
        .then((res) => {
            resolve(res.rowCount)
        })
        .catch((error) => {
            console.log("No row was updated, Correct the error and retry")
            reject(error)
        })
    })

}

module.exports = model