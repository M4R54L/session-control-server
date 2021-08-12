const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'El usuario es requerido'],
      unique: [true, 'El usuario ya existe'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
