const Sequelize = require('sequelize');
// Conexão com o Banco de Dados via MySQL
  const sequelize = new Sequelize('postapp', 'root', 'SenhaPadrao', {
    host: "localhost",
    dialect: 'mysql'
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
