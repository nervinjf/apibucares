const { Abastecimiento } = require('../models');
const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');
require('dotenv').config();

const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    'https://biodemo.ex-cle.com:4443/Biopago2/IPG2/connect/token', // URL del endpoint del token de acceso
    '25060008', // ID de cliente (client_id)
    'dv05EbiJ' // Clave secreta del cliente (client_secret)
);


class BancoServices {
    static async get() {
        try {
            const result = await Abastecimiento.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async postPagobdv(data) {

        try {

            // Realizar la solicitud para obtener el token de acceso
            const auth = await getClientCredentials('OAuth2'); // Ámbito opcional
            const accessToken = auth.access_token;
            console.log('Token de acceso:', accessToken);

            const { amount, number, casa, fecha, cellPhone, email, urlToReturn } = data;

            const paymentData = {
                currency: 1,
                amount: amount,
                reference: `PRB${casa}-${fecha.replace('-', '').replace('-', '')}`,
                title: 'Pago factura',
                description: 'Cancela condominio',
                letter: 'V',
                number: number,
                urlToReturn: urlToReturn,
                cellPhone: cellPhone,
                email: email,
            };

            // Realiza la solicitud a la API con el token de acceso
            const response = await axios.post('https://biodemo.ex-cle.com:4443/Biopago2/IPG2/api/Payments', paymentData, {
                headers: headers,
            });

            console.log(response.data); // Puedes acceder a los datos de la respuesta usando response.data
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = BancoServices;