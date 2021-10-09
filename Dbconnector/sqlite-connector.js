const Sequelize = require("sequelize");
const sequelize = new Sequelize({

host: 'localhost',
dialect: 'sqlite',

pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
},
storage: './database.sqlite',
operatorsAliases: false

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../Models/user.model.js")(sequelize, Sequelize);

module.exports = db;