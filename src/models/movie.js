const model = {}
const db = require('../config/db')
const escape = require('pg-format')

//get ALL Movie
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

// search movie by query
model.getBy = async ({ page, limit, orderBy, search }) => {
    try {
        let filterQuery = ''
        let orderQuery = ''
        let metaQuery = ''
        let count = 0

        if (search) {
            filterQuery += escape('AND movie_name = %L', search)
        }

        if (orderBy) {
            orderQuery += escape('ORDER BY %s DESC ', orderBy)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            metaQuery += escape('LIMIT %s OFFSET %s', limit, offset)
        }

        db.query(`SELECT COUNT(movie_id) as "count" FROM public.movie WHERE true ${filterQuery}`).then((v) => {
            count = v.rows[0].count
        })

        const data = await db.query(`
            SELECT 
                mv.movie_id,
                mv.title,
                mv.movie_banner,
                mv.release_date,
                json_agg(
                    JSONB_BUILD_OBJECT(
                        'id', mg.movie_genre_id,
                        'value', g.genre_name 
                    )
                ) as genre,
                mv.created_at, 
                mv.updated_at
            FROM public.movie mv
            JOIN public.movie_genre mg ON mg.movie_id = mv.movie_id
            JOIN public.genre g ON mg.genre_id = g.genre_id
            WHERE true ${filterQuery}
            GROUP BY mv.movie_id
            ${orderQuery} ${metaQuery}
        `)

        const meta = {
            next: count <= 0 ? null : page == Math.ceil(count / limit) ? null : Number(page) + 1,
            prev: page == 1 ? null : Number(page) - 1,
            total: count
        }

        if (data.rows <= 0) {
            return 'data not found'
        } else {
            return { data: data.rows, meta }
        }
    } catch (error) {
        throw error
    }
}


model.addMovie = ({ title, movie_banner, duration, director, casts, release_date  }) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.movie (title, movie_banner, duration, director, casts, release_date) VALUES($1, $2, $3, $4, $5, $6)`, [title, movie_banner, duration, director, casts, release_date])
            .then((res) => {
                resolve(`${res.rowCount} data row added`)
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
            resolve(`${res.rowCount} data row updated`)
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
            resolve(`${res.rowCount} data row deleted`)
        })
        .catch((error) => {
            console.log("No row was updated, Correct the error and retry")
            reject(error)
        })
    })

}

module.exports = model