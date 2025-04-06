const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,   
    },  
});

const sendResetEmail = async (to, token) =>  {
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
        from: `"soporte" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Restablecer contraseña',
        html: `
        <h3>Solicitud de restablecimiento de contraseña</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
        <br/><br>
        <small>Este enlace expira en 1 hora.</small>
        `       
    });
};

module.exports = { sendResetEmail };