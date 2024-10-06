require('dotenv').config();

const APP_URL = process.env.APP_URL;
const APP_PORT = process.env.APP_PORT || 80;

const BASE_URL = `${APP_URL}:${APP_PORT}`;

module.exports = {
    BASE_URL
};