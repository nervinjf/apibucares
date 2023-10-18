const { Abastecimiento } = require('../models');
const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');
require('dotenv').config();


async function generateAccessToken() {
    const response = await axios({
      url: "https://biodemo.ex-cle.com:4443/Biopago2/IPG2/connect/token",
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: "25060008",
        password: "dv05EbiJ",
      },
    });
    return response.data.access_token;
  }



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
            const token = await generateAccessToken();

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
                headers: {
                    Authorization: `Bearer ${token}`
                },
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