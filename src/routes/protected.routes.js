const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middlewares');

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({message: `Bienvenido al dashboard, ${req.user.id}`,});    
});

router.get('/admin-panel', authMiddleware, adminMiddleware, (req, res) => {
    res.json({message: "Bienvenido al centro de administración"});
});

module.exports = router;