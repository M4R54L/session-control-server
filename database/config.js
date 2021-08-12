const mongoose = require('mongoose');

const bddConnection = async () => {
  try {
    await mongoose.connect(
      process.env.BDD_CONNECTION,
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Base de datos conectada');
      }
    );
  } catch (error) {
    console.log(`Error al conectar la base de datos ${error}`);
  }
};

module.exports = bddConnection;
