require('dotenv').config()
const { DB_CONNECTION, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": DB_HOST,
    "dialect": DB_CONNECTION,
    "port": DB_PORT,
    "timezone": '-03:00',
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "horizonx_test",
    "host": DB_HOST,
    "dialect": DB_CONNECTION,
    "port": DB_PORT,
    "timezone": '-03:00',
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}