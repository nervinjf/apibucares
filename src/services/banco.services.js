const { Abastecimiento } = require('../models');
const axios = require('axios');
const oauth = require('axios-oauth-client')
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

        const getClientCredentials = async (clientId, clientSecret) => {
            const auth = await oauth.clientCredentials(
                axios.create(),
                'https://biodemo.ex-cle.com:4443/Biopago2/IPG2/oauth2/token',
                clientId,
                clientSecret
            )
            return auth
        }

        try {
            // Obtiene el token de acceso
            const auth = await getClientCredentials(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
            const token = auth.accessToken

            // Agrega el token de acceso a la cabecera de la solicitud
            axios.default.headers.common['Authorization'] = `Bearer ${token}`

            const { amount, number, casa, fecha, cellPhone, email, urlToReturn } = data

            console.log(auth, token)

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

            // Realiza la solicitud a la API
            const result = await axios.post('https://biodemo.ex-cle.com:4443/Biopago2/IPG2/api/Payments', data2)
            console.log(result)
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}

module.exports = BancoServices;