const ctrl = {}
const model = require('../models/users')
const response = require('../utils/respon')
const hash = require('../utils/hash')

ctrl.fetchData = async (req, res) => {
    try {
        const result = await model.getByUser(req.user)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}


ctrl.save = async (req, res) => {
    try {
        const hashPassword = await hash(req.body.password)
        const params = {
            ...req.body,
            password: hashPassword
        }

        const result = await model.saveData(params)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

ctrl.update = async (req, res) => {
    try {
        const result = await model.updateData(req.user)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

ctrl.delete = async (req, res) => {
    try {
        const result = await model.deleteData(req.user)
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

module.exports = ctrl