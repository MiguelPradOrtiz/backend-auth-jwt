const adminMiddleware = (req, res, next) => {
    if(req.user.role != "admin"){
        return res.status(403).json({message: "Acceso denegado, no eres admin"});
    }
    next();
};

module.exports = adminMiddleware;