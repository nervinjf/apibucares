const { Abastecimiento } = require('../models');
const axios = require('axios');
require('dotenv').config();


async function generateAccessToken() {
    const response = await axios({
      url: "https://biodemo.ex-cle.com:4443/Biopago2/IPG2/connect/token",
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });
    return response.data.access_token;
  }



class BancoServices {
    static async getPagobdv(id) {
        try {
            const token = await generateAccessToken();

            const response = await axios.get(`https://biodemo.ex-cle.com:4443/Biopago2/IPG2/api/Payments/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
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
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = BancoServices;