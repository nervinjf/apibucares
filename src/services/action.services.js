const { Preliminar, Gastos, ReciboModelo, Vivienda, Recibo, Users } = require('../models');
const transporter = require("../utils/mailer");
const Thank = require("../templates/Bienvenida");



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
            montomes = montomes + montomes*(10/100);
            console.log(montomes.toFixed(2))

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
                            include:{
                                model: Gastos,
                                as: "recibomodeloGastos",
                                attributes:[ "id", "nombre", "Fecha", "ncasa", "monto"]
                            }
                        }
                    }
                }]
            })

                const test = allviviendas.filter(e => e?.id != 2)

            console.log(test);

            for (const e of test) {

                console.log(e?.id)
                const deuda =  e?.uservivienda?.deudadl;
                const meses = e?.uservivienda?.recibospendientes;
                const totalpagar = deuda ? deuda : 0 + montomes.toFixed(2);
                const recipen = e?.uservivienda?.viviendaRecibo?.filter(e => e?.status != 'Pagado')
                const status = recipen?.length <= 1 ? 'Solvente' : 'Moroso'
                const post = await Recibo.create({ userId: e?.id, viviendaId: e?.uservivienda?.id, saldoanterio: deuda, interesmora: 1, meses: Number(meses), montomes: montomes.toFixed(2), totalpagar: totalpagar, reciboModeloId: id, status: 'Deuda'})

                await transporter.sendMail({
                    from: '<nervinjflores@gmail.com>',
                    to: e.correo, // Reemplaza con la dirección de correo correcta de la vivienda
                    subject: `Recibo Bucares Casa ${e?.uservivienda?.nroCasa}`,
                    text: 'Recibo Bucares',
                    html: Thank(),
                  });

                  console.log('Correo enviado a:', 'correo_destino@ejemplo.com');
                    console.log(`numero: ${recipen.length}, status: ${status}, total: ${totalpagar}`)
                    console.log(`where: { id: ${e.id} }`)
                  const update = await Vivienda.update({ recibospendientes: Number(recipen.length),  status: status }, {
                    where: { id: e.id },
                } )
                console.log(update)
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = ActionServices;
