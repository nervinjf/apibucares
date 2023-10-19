const { Preliminar, Gastos, ReciboModelo, Vivienda, Recibo, Users, Tasa } = require('../models');
const transporter = require("../utils/mailer");
const fs = require('fs');
const { saveAs } = require('file-saver');
const recibocondominio = require('../templates/Recibo'); // Reemplaza la ruta con la ubicación correcta de tu archivo
const puppeteer = require('puppeteer');
const pdfFolderPath = './pdf'; // Ruta de la carpeta donde deseas guardar los PDF
const pdfUrl = 'https://github.com/nervinjf/apibucares/blob/bd342bfd3108b8f050e8f7e41181b1bb6915ac4e/src/templates/pdf/Recibo.pdf';
const axios = require('axios');
const moment = require('moment');
const currency = require("currency.js");

const Bs = value => currency(value, { symbol: 'Bs. ', decimal: ',', separator: '.' });
const USD = value => currency(value, { symbol: '$', decimal: ',', separator: '.' });

class ActionServices {

    static async convertirReciboModelo(id) {
        try {
            const result = await Preliminar.findByPk(id, {
                attributes: ["id", "Fecha", "bcv"],
                include: {
                    model: Gastos,
                    as: "preliminarGastos",
                    attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                }
            })
            const { Fecha, bcv, preliminarGastos } = result

            const dataReciboModelo = await ReciboModelo.create({ bcv: bcv, Fecha: Fecha });

            const { id: idRM } = dataReciboModelo

            for (const gasto of preliminarGastos) {
                await Gastos.update(
                    { recibo_modelo_id: idRM, preliminar_id: null },
                    { where: { id: gasto.id } },
                );
            }
            const result2 = await Preliminar.destroy({
                where: { id }
            })
            return result2;
        } catch (error) {
            throw error;
        }
    }

    static async EnviarRecibo(id) {
        try {

            const reciboModel = await ReciboModelo.findByPk(id, {
                attributes: ["id", "Fecha", "bcv"],
                include: {
                    model: Gastos,
                    as: "recibomodeloGastos",
                    attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                }
            })

            const tasa = await Tasa.findOne({
                order: [['Fecha', 'DESC']], // Ordenar por fecha de forma descendente
                limit: 1 // Limitar el resultado a 1 registro (el último)
            });


            let montomes = 0;

            for (const e of reciboModel.recibomodeloGastos) {
                montomes += Number(e.monto / 244)
            }

            montomes = montomes + montomes * (10 / 100);

            const allviviendas = await Users.findAll({
                attributes: ["id", "nombre", "apellido", "correo", "rolId"],
                include: [{
                    model: Vivienda,
                    as: "uservivienda",
                    attributes: ["id", "nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
                    include: {
                        model: Recibo,
                        as: "viviendaRecibo",
                        attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status", "montopagado", "montorestante", "saldoanterio"],
                        include: {
                            model: ReciboModelo,
                            as: "reciboRecibomodelo",
                            attributes: ["id", "Fecha", "bcv"],
                            include: {
                                model: Gastos,
                                as: "recibomodeloGastos",
                                attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                            }
                        }
                    }
                }]
            })

            const test = allviviendas.filter(e => e?.uservivienda != null)

            for (const e of test) {

                console.log(e?.uservivienda?.id)
                const deuda = e?.uservivienda?.deudadl;
                const meses = e?.uservivienda?.recibospendientes;
                const totalpagar = deuda ? (deuda + montomes).toFixed(2) : (0 + montomes).toFixed(2);
                const recipen = e?.uservivienda?.viviendaRecibo?.filter(e => e?.status != 'Pagado')
                const status = recipen?.length <= 1 ? 'Solvente' : 'Moroso'
                const post = await Recibo.create({ userId: e?.id, viviendaId: e?.uservivienda?.id, saldoanterio: deuda, interesmora: 1, meses: Number(meses), montomes: montomes.toFixed(2), montorestante: (0 - montomes.toFixed(2)), totalpagar: totalpagar, reciboModeloId: id, status: 'Deuda' })

                const data = await Users.findByPk(e.id, {
                    attributes: ["id", "nombre", "apellido", "correo", "rolId"],
                    include: [{
                        model: Vivienda,
                        as: "uservivienda",
                        attributes: ["id", "nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
                        include: {
                            model: Recibo,
                            as: "viviendaRecibo",
                            attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status"],
                        }
                    }]
                })

                console.log(post.id)

                const recibo = await Recibo.findByPk(post.id, {
                    attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status", "montopagado", "montorestante", "saldoanterio"],
                    include: {
                        model: ReciboModelo,
                        as: "reciboRecibomodelo",
                        attributes: ["id", "Fecha", "bcv"],
                        include: {
                            model: Gastos,
                            as: "recibomodeloGastos",
                            attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                        }
                    }
                })


                if (!fs.existsSync(pdfFolderPath)) {
                    fs.mkdirSync(pdfFolderPath);
                }

                let totalmontodolares = 0;
                let totalalicuotadolares = 0;
                let totalmontoBs = 0;
                let totalalicuotaBs = 0;

                recibo?.reciboRecibomodelo?.recibomodeloGastos?.map(e => {

                    totalmontodolares += Number(e.monto);
                    totalalicuotadolares += Number(e.monto / 244);
                    totalmontoBs += Number(e.monto * tasa?.Tasa);
                    totalalicuotaBs += Number(e.monto * tasa?.Tasa / 244);

                });

                const totalmontodolares1 = Math.floor(totalmontodolares * 100) / 100;
            const totalmontodolares2 = Math.floor((totalmontodolares * 0.1) * 100) / 100;
            const totalmontodolares3 = Math.round((totalmontodolares1 + totalmontodolares2) * 100) / 100;
            const totalmontodolares4 = Math.round((totalmontodolares1 + totalmontodolares2) * 100) / 100;

            const totalalicuotadolares1 = Math.floor(totalalicuotadolares * 100) / 100;
            const totalalicuotadolares2 = Math.floor((totalalicuotadolares * 0.1) * 100) / 100;
            const totalalicuotadolares3 = Math.floor((totalalicuotadolares1 + totalalicuotadolares2) * 100) / 100;
            const totalalicuotadolares4 = Math.floor((totalalicuotadolares1 + totalalicuotadolares2 ) * 100) / 100;

            const totalmontoBs1 = Math.floor(totalmontoBs * 100) / 100;
            const totalmontoBs2 = Math.floor((totalmontoBs * 0.1) * 100) / 100;
            const totalmontoBs3 = Math.floor((totalmontoBs1 + totalmontoBs2) * 100) / 100;
            const totalmontoBs4 = Math.floor((totalmontoBs1 + totalmontoBs2) * 100) / 100;

            const totalalicuotaBs1 = Math.floor(totalalicuotaBs * 100) / 100;
            const totalalicuotaBs2 = Math.floor((totalalicuotaBs * 0.1) * 100) / 100;
            const totalalicuotaBs3 = Math.floor((totalalicuotaBs1 + totalalicuotaBs2) * 100) / 100;
            const totalalicuotaBs4 = Math.floor((totalalicuotaBs1 + totalalicuotaBs2) * 100) / 100;

                console.log(totalmontodolares, totalalicuotadolares, totalmontoBs, totalalicuotaBs, tasa?.Tasa)

                const contenidoHTML = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                    `<div key=${e.id} style="display: flex; justify-content: flex-start; align-items: flex-end; border-top: 0.1rem solid black; height: 1rem;
font-size: 0.75rem; padding: 0 0.4rem">
        <p>${e.nombre}</p>
    </div>`).join('');

                const contenidoHTML1 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                    `<div key=${e.id} style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 1rem
;
font-size: 0.8rem">
        <p>${USD(e?.monto).format()}</p>
    </div>`).join('');

                const contenidoHTML2 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                    `<div key=${e.id} style=" display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.8rem">
    <p>${USD(e?.monto / 244).format()}</p>
</div>`).join('');

                const contenidoHTML3 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                    `<div key=${e.id} style=" display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.8rem">
    <p>${Bs(e?.monto * tasa?.Tasa).format()}</p>
</div>`).join('');

                const contenidoHTML4 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                    `<div key=${data.id} style="display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.8rem">
    <p>${Bs(e?.monto * tasa?.Tasa / 244).format()}</p>
</div>`).join('');


                // Llama a la función generatePDF para generar el PDF
                await new Promise(async (resolve, reject) => { // Asegúrate de que la función sea async
                    try {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();

                        const response = await axios.get(pdfUrl);
                        const pdfBuffer = response.data;

                        await page.setContent(recibocondominio(data, recibo, contenidoHTML, contenidoHTML1, contenidoHTML2, contenidoHTML3, contenidoHTML4, tasa, totalmontodolares1, totalmontodolares2, totalmontodolares3, totalmontodolares4,
                            totalalicuotadolares1, totalalicuotadolares2, totalalicuotadolares3, totalalicuotadolares4, totalmontoBs1, totalmontoBs2, totalmontoBs3, totalmontoBs4, totalalicuotaBs1, totalalicuotaBs2, totalalicuotaBs3, totalalicuotaBs4)); await page.addStyleTag({
                                content: `
            /* Define márgenes y estilo de página */
            @page {
                size: A4;
            }

            /* Estilo del encabezado de página */
            header {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }

            /* Estilo del pie de página de página */
            footer {
                text-align: center;
                font-size: 12px;
            }
        `,
                            });



                        const pdf = await page.pdf({ format: 'A4' });



                        await browser.close();
                        console.log("PDF generado y listo para enviar.");

                        // Ahora puedes enviar el correo electrónico dentro de este bloque
                        await transporter.sendMail({
                            from: '<nervinjflores@gmail.com>',
                            to: e.correo,
                            subject: `Recibo mes ${moment(recibo.reciboRecibomodelo.Fecha).format('MM/YYYY')} - Casa ${e?.uservivienda?.nroCasa}`,
                            text: `Buenas tardes ${e?.uservivienda?.nombre}, \neste es el recibo ${moment(recibo.reciboRecibomodelo.Fecha).format('MM/YYYY')}. \npara mas informacion acercarse al condominio\n Saludos cordiales\n Junta de Condominio`,
                            attachments: [
                                {
                                    filename: 'recibo.pdf',
                                    content: pdf, // Adjunta el PDF generado
                                },
                            ],
                        });

                        resolve();
                    } catch (error) {
                        console.error("Error al generar el PDF o enviar el correo:", error);
                        reject(error);
                    }
                })

                console.log('Correo enviado a:', 'correo_destino@ejemplo.com');
                console.log(`numero: ${Number(recipen.length)}, status: ${status}, total: ${totalpagar}`)
                console.log(`where: { id: ${e.id} }`)
                const update = await Vivienda.update({ recibospendientes: Number(recipen.length), status: status, deudabs: totalpagar, deudadl: totalpagar }, {
                    where: { id: e?.uservivienda?.id },
                });

                console.log(update);
                console.log(update);
            }

        } catch (error) {
            throw error;
        }
    }

    static async DownloadRecibo(id, userId) {
        try {
            console.log(id, userId)
            const recibo = await Recibo.findByPk(id, {
                attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status"],
                include: {
                    model: ReciboModelo,
                    as: "reciboRecibomodelo",
                    attributes: ["id", "Fecha", "bcv"],
                    include: {
                        model: Gastos,
                        as: "recibomodeloGastos",
                        attributes: ["id", "nombre", "Fecha", "ncasa", "monto"]
                    }
                }
            })

            const tasa = await Tasa.findOne({
                order: [['Fecha', 'DESC']], // Ordenar por fecha de forma descendente
                limit: 1 // Limitar el resultado a 1 registro (el último)
            });

            let montomes = 0;

            for (const e of recibo?.reciboRecibomodelo?.recibomodeloGastos) {
                montomes += Number(e.monto / 244)
            }
            montomes = montomes + montomes * (10 / 100);

            const data = await Users.findByPk(userId, {
                attributes: ["id", "nombre", "apellido", "correo", "rolId"],
                include: [{
                    model: Vivienda,
                    as: "uservivienda",
                    attributes: ["id", "nombre", "nroCasa", "telefono", "numero", "etapa", "sector", "casa", "calle", "recibospendientes", "deudadl", "deudabs", "status"],
                    include: {
                        model: Recibo,
                        as: "viviendaRecibo",
                        attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses", "status"],
                    }
                }]
            })

            let totalmontodolares = 0;
            let totalalicuotadolares = 0;
            let totalmontoBs = 0;
            let totalalicuotaBs = 0;

            recibo?.reciboRecibomodelo?.recibomodeloGastos?.map(async e => {

                totalmontodolares += Number(e.monto);
                totalalicuotadolares += Number(e.monto / 244);
                totalmontoBs += Number(e.monto * tasa?.Tasa);
                totalalicuotaBs += Number(e.monto * tasa?.Tasa / 244);
            });

            
            
            const totalmontodolares1 = Math.floor(totalmontodolares * 100) / 100;
            const totalmontodolares2 = Math.floor((totalmontodolares * 0.1) * 100) / 100;
            const totalmontodolares3 = Math.round((totalmontodolares1 + totalmontodolares2) * 100) / 100;
            const totalmontodolares4 = Math.round((totalmontodolares1 + totalmontodolares2) * 100) / 100;

            const totalalicuotadolares1 = Math.floor(totalalicuotadolares * 100) / 100;
            const totalalicuotadolares2 = Math.floor((totalalicuotadolares * 0.1) * 100) / 100;
            const totalalicuotadolares3 = Math.floor((totalalicuotadolares1 + totalalicuotadolares2) * 100) / 100;
            const totalalicuotadolares4 = Math.floor((totalalicuotadolares1 + totalalicuotadolares2 ) * 100) / 100;
            
            const totalmontodolares_ = Math.floor(totalmontodolares * 100) / 100;
            const totalmontoBs1 = Math.floor((totalmontodolares_ * tasa?.Tasa) * 100) / 100;
            const totalmontoBs2 = Math.floor((totalmontodolares2 * tasa?.Tasa) * 100) / 100;
            const totalmontoBs3 = Math.floor((totalmontoBs1 + totalmontoBs2) * 100) / 100;
            const totalmontoBs4 = Math.floor((totalmontoBs1 + totalmontoBs2) * 100) / 100;

            const totalalicuotadolares_ = Math.floor(totalalicuotadolares * 100) / 100;
            const totalalicuotaBs1 = Math.floor((totalalicuotadolares_ * tasa?.Tasa) * 100) / 100;
            const totalalicuotaBs2 = Math.floor((totalalicuotadolares2 * tasa?.Tasa) * 100) / 100;
            const totalalicuotaBs3 = Math.floor((totalalicuotaBs1 + totalalicuotaBs2) * 100) / 100;
            const totalalicuotaBs4 = Math.floor((totalalicuotaBs1 + totalalicuotaBs2) * 100) / 100;

            console.log(totalmontodolares1, totalalicuotadolares1, totalmontoBs1, totalalicuotaBs1, tasa?.Tasa)

            const contenidoHTML = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                `<div key=${e.id} style="display: flex; justify-content: flex-start; align-items: flex-end; border-top: 0.1rem solid black; height: 1rem;
font-size: 0.65rem; padding: 0 0.4rem">
        <p>${e.nombre}</p>
    </div>`).join('');

            const contenidoHTML1 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                `<div key=${e.id} style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 1rem
;
font-size: 0.7rem">
        <p>${USD(e?.monto).format()}</p>
    </div>`).join('');

            const contenidoHTML2 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                `<div key=${e.id} style=" display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.7rem">
    <p>${USD(e?.monto / 244).format()}</p>
</div>`).join('');

            const contenidoHTML3 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                `<div key=${e.id} style=" display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.7rem">
    <p>${Bs(e?.monto * tasa?.Tasa).format()}</p>
</div>`).join('');

            const contenidoHTML4 = recibo?.reciboRecibomodelo?.recibomodeloGastos?.map((e) =>
                `<div key=${data.id} style="display: flex;
justify-content: center;
align-items: center;
border-top: 0.1rem solid black;
height: 1rem;
font-size: 0.7rem">
    <p>${Bs(e?.monto * tasa?.Tasa / 244).format()}</p>
</div>`).join('');


            // Llama a la función generatePDF para generar el PDF
            await new Promise(async (resolve, reject) => { // Asegúrate de que la función sea async
                try {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();

                    // const response = await axios.get(pdfUrl);
                    // const pdfBuffer = response.data;

                    await page.setContent(recibocondominio(data, recibo, contenidoHTML, contenidoHTML1, contenidoHTML2, contenidoHTML3, contenidoHTML4, tasa, totalmontodolares1, totalmontodolares2, totalmontodolares3, totalmontodolares4,
                        totalalicuotadolares1, totalalicuotadolares2, totalalicuotadolares3, totalalicuotadolares4, totalmontoBs1, totalmontoBs2, totalmontoBs3, totalmontoBs4, totalalicuotaBs1, totalalicuotaBs2, totalalicuotaBs3, totalalicuotaBs4));
                    await page.addStyleTag({
                        content: `
            /* Define márgenes y estilo de página */
            @page {
                size: A4;
            }

            /* Estilo del encabezado de página */
            header {
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }

            /* Estilo del pie de página de página */
            footer {
                text-align: center;
                font-size: 12px;
            }
        `,
                    });

                    const pdf = await page.pdf({ format: 'A4' });



                    await browser.close();
                    console.log("PDF generado y listo para enviar.", "listo");

                    // Ahora puedes enviar el correo electrónico dentro de este bloque
                    await transporter.sendMail({
                        from: '<nervinjflores@gmail.com>',
                        to: data.correo,
                        subject: `Recibo mes ${moment(recibo.reciboRecibomodelo.Fecha).format('MM/YYYY')} - Casa ${data?.uservivienda?.nroCasa}`,
                        text: `Buenas tardes ${data?.uservivienda?.nombre}, \neste es el recibo ${moment(recibo.reciboRecibomodelo.Fecha).format('MM/YYYY')}. \npara mas informacion acercarse al condominio\nSaludos cordiales\nJunta de Condominio`,
                        attachments: [
                            {
                                filename: 'recibo.pdf',
                                content: pdf, // Adjunta el PDF generado
                            },
                        ],
                    });
                    resolve();
                } catch (error) {
                    console.error("Error al generar el PDF o enviar el correo:", error);
                    reject(error);
                }
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = ActionServices;