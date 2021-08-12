const { request, response } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const getUsers = async (req = request, res = response) => {
  const { limit = 10, from: skip = 0 } = req.query;
  const query = {};

  await User.find(query, (error, docs) => {
    if (error)
      return res.status(500).json({
        errors: error,
      });

    res.json({
      payload: docs,
    });
  })
    .limit(Number(limit))
    .skip(Number(skip));
};

const getUser = async (req = request, res = resposne) => {
  const { id } = req.params;
  await User.findById(id, (error, docs) => {
    if (error)
      return res.status(500).json({
        errors: error,
      });

    res.json({
      payload: docs,
    });
  });
};

const postUser = async (req = request, res = resposne) => {
  const user = new User(req.body);

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);

  await user.save((error, docs) => {
    if (error)
      return res.status(500).json({
        errors: error,
      });

    res.json({
      payload: `Usuario ${docs.username} guardado`,
    });
  });
};

const putUser = async (req = request, res = resposne) => {
  const { id } = req.params;
  const { password, ...body } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(password, salt);
  }

  User.findByIdAndUpdate(id, { ...body }, (error, docs) => {
    if (error)
      return res.status(500).json({
        errors: error,
      });

    res.json({
      payload: `Usuario ${docs.username} actualizado`,
    });
  });
};

const deleteUser = async (req = request, res = resposne) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id, (error, docs) => {
    if (error) {
      return res.status(500).json({
        errors: error,
      });
    }

    res.json({
      payload: `Usuario ${docs.username} eliminado`,
    });
  });
};

module.exports = {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
