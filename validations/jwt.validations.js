const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
  const token = req.header('token');

  if (!token)
    return res.status(401).json({
      errors: 'Token no encontrado',
    });

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      errors: 'Token inválido',
    });
  }

  next();
};

module.exports = validateJwt;
