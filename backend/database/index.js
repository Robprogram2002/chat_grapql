const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "chat_graphql_database",
  "postgres",
  "passwordSegura20",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  }
);
