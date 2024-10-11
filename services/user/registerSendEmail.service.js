const { sendMail } = require('../../helpers/email.helper');
const { APP_BASE_URL } = process.env;

const registerSendEmail = async (firstName, lastName, email, registrationCode) => {
    const body =
        `
        <h1>Bienvenid@ ${lastName} ${firstName}</h1>
        Gracias por registarte en HorizonX. Para activar tu cuenta, haz click en el siguiente enlace:

        <a href=${APP_BASE_URL}/api/auth/validate/${registrationCode}>Activar mi cuenta</a>
    `;
    const subject = 'Bienvenido a HorizonX';

    await sendMail(email, subject, body)
}

module.exports = { registerSendEmail }