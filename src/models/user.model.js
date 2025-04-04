const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, requiered: true},
    email: { type: String, requiered: true, unique: true},
    password: { type: String, requiered: true},
    role: { type: String, enum:['user','admin'], default: 'user'},
});

//middleware para cifrar la constraseña antes de guardar
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

//metodo para comparacion de contraseñas
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


module.exports = mongoose.model('User', UserSchema);