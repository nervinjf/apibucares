const { Abastecimiento } = require('../models');
const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');
require('dotenv').config();

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
            // Obtener el token de OAuth2 usando el flujo de credenciales del cliente
            const tokenResponse = await axios.post('https://biodemo.ex-cle.com:4443/Biopago2/IPG2/connect/token', {
                grant_type: 'client_credentials',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                scope: 'OAuth2', // Especifica el alcance que se requiere
            });

            const accessToken = tokenResponse.data.access_token;

            console.log(tokenResponse)

            // Configurar las cabeceras con el token de acceso
            const headers = {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            };

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