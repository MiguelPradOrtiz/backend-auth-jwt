const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb conectado");
        
    }catch(error){
        console.log("error al conectar con mongodb ",error);
        process.exit(1);
    }
};

module.exports = connectDB;