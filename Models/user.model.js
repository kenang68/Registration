module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
      });
  
    return User;
  };