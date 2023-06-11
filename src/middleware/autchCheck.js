const ctrl = {}
const respon = require('../utils/respon')
const jwt = require('jsonwebtoken')

const check = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return respon (res, 401, 'anda perlu login terlebih dahulu')
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token,"INI_SECRET_KEY", (err, decode) => {
            if (err) {
                return respon (res, 401, err)
            }
            console.log(decode)
            req.user = decode.data
            return next()
    } )
}

module.exports = check