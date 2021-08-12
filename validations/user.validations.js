const validateJwt = require('./jwt.validations');
const mongoose = require('mongoose');
const User = require('../models/User');

const idIsValid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(401).json({
      errors: 'El id no es válido',
    });

  next();
};

const userExists = async (req, res, next) => {
  const { username } = req.body;
  const { id } = req.params;

  const user = await (id ? User.findById(id) : User.findOne({ username }));

  if (user) {
    return res.status(400).json({
      errors: 'El usuario ya existe',
    });
  }

  next();
};

const userNoExists = async (req, res, next) => {
  const { username } = req.body;
  const { id } = req.params;

  const user = await (id ? User.findById(id) : User.findOne({ username }));

  if (!user) {
    return res.status(400).json({
      errors: 'El usuario no existe',
    });
  }

  next();
};

const getUsersValidation = [validateJwt];
const getUserValidation = [validateJwt, idIsValid];
const postUserValidation = [validateJwt, userExists];
const putUserValidation = [validateJwt, idIsValid, userNoExists];
const deleteUserValidation = [validateJwt, idIsValid, userNoExists];

module.exports = {
  getUsersValidation,
  getUserValidation,
  postUserValidation,
  putUserValidation,
  deleteUserValidation,
};
