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

        const clientID = '25060008';
        const clientSecret = 'dv05EbiJ';
        const tokenURL = 'https://biodemo.ex-cle.com:4443/Biopago2/IPG2/connect/token';

        const formData = {
            grant_type: 'client_credentials',
            client_id: clientID,
            client_secret: clientSecret,
            scope: 'OAuth2'
        };

        // Configurar las opciones para la solicitud POST
        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(formData), // Formatear datos como application/x-www-form-urlencoded
            url: tokenURL
        };

        try {

            // Realizar la solicitud para obtener el token de acceso
            const resp = await axios(requestOptions);
            const accessToken = resp.data.access_token;
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