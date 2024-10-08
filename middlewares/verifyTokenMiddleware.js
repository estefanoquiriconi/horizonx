const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1];


    if (!token) {
        return res.status(403).json({ msg: "Token requerido" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "Token inválido" });
        }

        req.user = user;
        next();
    })

}

module.exports = { verifyToken }