const { Abastecimiento } = require('../models');
const axios = require('axios');
const axiosOauthClient = require('axios-oauth-client');
require("dotenv").config();

class BancoServices {

    static async get() {
        try {
            const result = await Abastecimiento.findAll()
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async postPagobdv(data) {
        try {
            // Obtiene el token de acceso
            const auth = await axiosOauthClient.clientCredentials(
                'https://biodemo.ex-cle.com:4443/Biopago2/IPG2/oauth2/token',
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );
            const token = auth.accessToken;

            // Agrega el token de acceso a la cabecera de la solicitud
            const instance = axios.create({
                headers: {
                    common: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });
            console.log(token)

            const { amount, number, casa, fecha, cellPhone, email, urlToReturn } = data

            const data2 = {
                "currency": 1,
                "amount": amount,
                "reference": `PRB${casa}-${fecha.replace('-', "").replace('-', "")}`,
                "title": "Pago factura",
                "description": "Cancela condominio",
                "letter": "V",
                "number": number,
                "urlToReturn": urlToReturn,
                "cellPhone": cellPhone,
                "email": email
            }

            
            console.log(data2)

            // Realiza la solicitud a la API
            const result = await instance.post('https://biodemo.ex-cle.com:4443/Biopago2/IPG2/api/Payments', data2);
            console.log(result.data)
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = BancoServices;