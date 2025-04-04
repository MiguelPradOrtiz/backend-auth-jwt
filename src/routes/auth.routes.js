const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({ message: 'El usuario ya existe'});
    }

    const user = new User({ name, email, password});
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: '1h',
    });

    res.status(201).json({ message: 'usuario registrado', token });

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: '1h',
    });

    res.json({ message: 'Inicio de sesion correcto', token });

});

module.exports = router;