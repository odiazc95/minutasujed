const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs'); 

const userSchema = new Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    matricula: Number,
    rfc: String,
    email: String,
    password: String,
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(20);
    return bcrypt.hash(password, salt);
}

/*
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

//ESTO SE UTILIZA SOLO PARA COMPARAR CONTRASEÑAS
userSchema.methods.validateRfc = function (rfc){
    return bcrypt.compare(rfc, this.rfc);
}*/

module.exports = model('user', userSchema);







/*const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    rfc: {
        type: Number,
        require: true
    },
    matricula: {
        type: Number,
        require: true
    }
});*/

//module.exports = mongoose.model('user', userSchema);