require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.db_USER,
    "password": process.env.db_PASSWORD,
    "database": process.env.db_DATABASE_DEV,
    "host": process.env.db_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.db_USER,
    "password": process.env.db_PASSWORD,
    "database": process.env.db_DATABASE_TEST,
    "host": process.env.db_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.db_USER,
    "password": process.env.db_PASSWORD,
    "database": process.env.db_DATABASE_PROD,
    "host": process.env.db_HOST,
    "dialect": "mysql"
  }
}
