const { Router } = require('express');
const validateLogin = require('../controllers/auth.controller');
const { loginValidation } = require('../validations/auth.validations');

const router = Router();

router.post('/', loginValidation, validateLogin);

module.exports = router;
