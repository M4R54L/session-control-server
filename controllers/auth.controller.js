const { request, response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateJwt = require('../helpers/jwt.helper');

const validateLogin = async (req = request, res = response) => {
  const { username, password } = req.body;
  const query = { username };

  const user = await User.findOne(query);

  if (!user)
    return res.status(401).json({
      errors: 'El usuario no existe',
    });

  const passwordValidation = bcrypt.compareSync(password, user.password);

  if (!passwordValidation)
    return res.status(401).json({
      errors: 'La contraseña es incorrecta',
    });

  const token = await generateJwt(user.id);

  res.json({
    payload: token,
  });
};

module.exports = validateLogin;
