const express = require("express");
const router = express.Router();
const User = require('../models/user.model');
const authMiddleware = require('../middlewares/auth.middleware');

const isAdmin = async (req, res, next) => {
    if(req.user.role != "admin"){
        return res.status(403).json({message: "Acceso denegado, se requiere el rol de admin"});
    }

    next();
};

router.put('/change-role/:id', authMiddleware, isAdmin, async (req, res) => {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin'];

    if(!allowedRoles.includes(role)){
        return res.status(400).json({message: "Rol invalido"});
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, {role}, {new: true});
        if(!user) return res.status(404).json({message: "Usuario no encontrado."});
        res.json({message: `Rol actualizado a ${role} para ${user.email}`});
    }catch(error){
        res.status(500).json({message: "Error al cambiar el rol", error: error.message});
    }
});

module.exports = router;