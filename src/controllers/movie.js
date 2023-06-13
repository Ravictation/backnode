const ctrlMovie = {}
const response = require ('../utils/respon')
const models = require('../models/movie')

ctrlMovie.getData = async (req, res) => {
    try{
        const result = await models.getAllMovie()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

//query movie
ctrlMovie.fetchBy = async (req, res) => {
    try {
        const params = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            orderBy: req.query.orderBy || 'created_at',
            search: req.query.search
        }
        const result = await models.getBy(params)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

ctrlMovie.saveData = async (req, res) => {
    try{
        if (req.file !== undefined) {
            req.body.movie_banner = req.file.path
        }
        console.log(req.file)

        const {title, release_date, duration, director, casts, genre_id} = req.body
        const result = await models.addMovie({title, release_date, duration, director, casts, genre_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlMovie.updateData = async (req, res) => {
    try{
        const {movie_id, release_date, genre_id} = req.query
        const result = await models.updateMovie({movie_id, release_date, genre_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

ctrlMovie.deleteData = async (req, res) => {
    try{
        const movie_id = req.params.movie_id
        const result = await models.deleteMovie({movie_id})
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = ctrlMovie