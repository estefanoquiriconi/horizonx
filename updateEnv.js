const fs = require('fs');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const interfaces = os.networkInterfaces();
let localIp = '127.0.0.1';

for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
        if (alias.family === 'IPv4' && !alias.internal) {
            localIp = alias.address;
            break;
        }
    }
}

const envFilePath = path.resolve(__dirname, '.env');
let envFile = fs.readFileSync(envFilePath, 'utf8');

envFile = envFile.replace(/^APP_URL=.*/m, `APP_URL=http://${localIp}`);
fs.writeFileSync(envFilePath, envFile, 'utf8');