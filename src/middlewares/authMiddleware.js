const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JTW_SECRET);
            req.user = decoded;
            next();
        } catch (error){
            res.status(401).json({ message: 'No autorizado' });
        }
    }

    if(!token){
        res.status(401).json({ message: 'No autorizado, token no encontrado'});
    }
}

module.exports = { protect };