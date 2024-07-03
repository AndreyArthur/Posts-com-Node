const Sequelize = require('sequelize');

const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);

// Conexão com o Banco de Dados via MySQL
  const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    logging: false,
  });

  async function setup() {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS postagens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255),
        conteudo VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  }

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  setup: setup,
}
