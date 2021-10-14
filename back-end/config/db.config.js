module.exports = {
    HOST: "localhost",
    USER: "Crecre",
    PASSWORD: process.env.db_PASSWORD,
    DB: "grouporama",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };