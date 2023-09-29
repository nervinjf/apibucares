const { Tasa } = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

class TasaPostServices {

    static async posttasa(tasabcv) {
        try {

            const respuesta = await axios.get('https://www.bcv.org.ve/');
            const html = respuesta.data;
            // Cargar el contenido HTML en Cheerio
            const $ = cheerio.load(html);
            // Extraer el valor del elemento con el id "dolar"
            const dolar = $('#dolar .centrado strong').text();
            const dolarp = dolar.replace(",", ".")
            const dolarf = Number(dolarp)
            const fecha = moment(new Date).format("YYYY-MM-DD")
            const dolarfinish = { Tasa: dolarf, Fecha: fecha };


            const result = await Tasa.create(dolarfinish)
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}

module.exports = TasaPostServices;