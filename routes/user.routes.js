const { Router } = require('express');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const {
  getUsersValidation,
  getUserValidation,
  postUserValidation,
  putUserValidation,
  deleteUserValidation,
} = require('../validations/user.validations');

const router = Router();

router.get('/', getUsersValidation, getUsers);
router.get('/:id', getUserValidation, getUser);
router.post('/', postUserValidation, postUser);
router.put('/:id', putUserValidation, putUser);
router.delete('/:id', deleteUserValidation, deleteUser);

module.exports = router;
