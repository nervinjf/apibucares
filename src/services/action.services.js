const { Preliminar, Gastos, ReciboModelo, Vivienda, Recibo, Users } = require('../models');
const transporter = require("../utils/mailer");
const fs = require('fs');
const recibocondominio = require('../templates/Recibo'); // Reemplaza la ruta con la ubicación correcta de tu archivo
const puppeteer = require('puppeteer');
var options = { format: 'Letter', format: 'A4' };
const pdfFolderPath = './pdf'; // Ruta de la carpeta donde deseas guardar los PDF
const pdfFilePath = ('D:/Usuarios/Mis Documentos/Nervin/Urb. Bucares/API/src/templates/pdf'); // Ruta completa del archivo PDF
const pdfUrl = 'https://github.com/nervinjf/apibucares/blob/bd342bfd3108b8f050e8f7e41181b1bb6915ac4e/src/templates/pdf/Recibo.pdf';
const fetch = require('node-fetch');



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
                const post = await Recibo.create({ userId: e?.id, viviendaId: e?.uservivienda?.id, saldoanterio: deuda, interesmora: 1, meses: Number(meses), montomes: montomes.toFixed(2), totalpagar: totalpagar, reciboModeloId: id, status: 'Deuda' })

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
                    attributes: ["id", "totalpagar", "montomes", "saldoanterio", "interesmora", "meses"],
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


                // Llama a la función generatePDF para generar el PDF
                await new Promise(async (resolve, reject) => { // Asegúrate de que la función sea async
                    try {
                         const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await fetch(pdfUrl);
    const pdfBuffer = await response.buffer();

   await page.setContent(recibocondominio(data, recibo));
await page.addStyleTag({
  content: `
    /* Define márgenes y estilo de página */
    @page {
      size: A4; /* El tamaño de página que desees */
      margin: 20mm 10mm; /* Márgenes superior e inferior de 20 mm y laterales de 10 mm */
    }

    /* Estilo del encabezado de página */
    header {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0;
    }

    /* Estilo del pie de página de página */
    footer {
      text-align: center;
      font-size: 12px;
      padding: 5px 0;
    }
  `,
});
const pdf = await pdf(page, 'A4', pdfBuffer);
    console.log("PDF generado y listo para enviar.");
    await browser.close();
                        resolve(); // Resuelve la promesa cuando todo esté completado
                    } catch (error) {
                        console.error("Error al generar el PDF:", error);
                        reject(error); // Rechaza la promesa en caso de error
                    }
                });

                await transporter.sendMail({
                    from: '<nervinjflores@gmail.com>',
                    to: e.correo, // Reemplaza con la dirección de correo correcta de la vivienda
                    subject: `Recibo Bucares Casa ${e?.uservivienda?.nroCasa}`,
                    text: 'Recibo Bucares',
                    attachments: [
                        {
                            filename: 'recibo.pdf',
                            content: await page.pdf({ format: 'A4', buffer: pdfBuffer }), // Adjunta el PDF generado en memoria
                        },
                    ]
                });

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
}

module.exports = ActionServices;
