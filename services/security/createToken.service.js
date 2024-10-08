const jwt = require('jsonwebtoken')

const createToken = (info) => {
    const { SECRET_KEY, EXPIRE_TOKEN } = process.env
    const token = jwt.sign(
        info,
        SECRET_KEY,
        { expiresIn: EXPIRE_TOKEN }
    );
}

module.exports = { createToken }