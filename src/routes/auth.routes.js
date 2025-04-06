const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { sendResetEmail } = require('../services/email.service');
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

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now()+3600000;
    await user.save();

    await sendResetEmail(user.email, resetToken);

    res.status(200).json({message: "Email de restablecimiento enviado"});
});


module.exports = router;