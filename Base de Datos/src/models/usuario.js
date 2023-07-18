const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  nombre: {
    type: String,
    maxlength: 50,
    required: true
  },
  apellido_paterno: {
    type: String,
    maxlength: 50
  },
  apellido_materno: {
    type: String
  },
  matricula: {
    type: Number
  },
  area: {
    type: String,
    maxlength: 150
  },
  cargo: {
    type: String,
    maxlength: 255,
    required: true
  },
  rfc: {
    type: String,
    maxlength: 20
  },
  email: {
    type: String,
    maxlength: 200
  },
  password: {
    type: String,
    maxlength: 255,
    required: true
  },
  token: {
    type: String,
    maxlength: 255
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = model('User', userSchema);
