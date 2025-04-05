const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const protectedRoutes = require('./routes/protected.routes');
const changeRole = require('./routes/admin.routes');

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/protected', protectedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', changeRole);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});