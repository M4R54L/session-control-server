const joi = require('joi');

const schema = joi.object({
  username: joi.string().required().min(3),
  password: joi.string().required().min(5).max(15),
});

const loginValidation = (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((el) => el.message);
    return res.status(400).json({
      errors,
    });
  }

  next();
};

module.exports = { loginValidation };
