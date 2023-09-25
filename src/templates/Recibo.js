
const moment = require('moment');
const logo = ('../img/logo.png');

const recibocondominio = (data, recibo, totalmontodolares, totalalicuotadolares, totalalicuotaBs, totalmontoBs, contenidoHTML, contenidoHTML1, contenidoHTML2, contenidoHTML3, contenidoHTML4) => `
<html lang="en" xmlns="https://www.w3.org/1999/xhtml" xmlns: o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                    <title>Recibo</title>
                    <link rel="stylesheet" href="./recibo.css">
                    </head>

                    <body style="padding: 1rem; margin: 0; width: 97%; height: 100%;">
                        <div style="
width: 100%; height: 100%;
    box-shadow: rgba(50, 50, 93, 0.034) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.041) 0px 18px 36px -18px inset;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;">
                            <div style="width: 100%;
                                    height: 95%;
                                    background: rgb(255, 255, 255);
                                    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
                                    padding: 1rem;">
                                <div
                                    style="display: flex; gap: 0.5rem; justify-content: center; align-items: center; flex-direction: column">
                                    <h1 style="margin: 0">Recibo</h1>
                                    <p style="margin: 0; text-align: center; font-size;: 1rem">FAVOR DEPOSITAR EN: <br />
                                        BANCO DE VENEZUELA, CUENTA CORRIENTE # 0102-0109-81-0000300425, CORREO:
                                        condominioparquebucare1@gmail.com <br />
                                        "NO" DEPOSITAR EN LA CUENTA DEL BANCO OCCIDENTAL DE DESCUENTO, POR LOS MOMENTOS.</p>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 100%;">
                                    <div style="width: 35%;
                display: flex;
                flex-direction: column;
                border-right: 0.1rem solid black;
                gap: 0.0rem;
                 height: 100%;">
                                        <img src=${logo} alt="" />
                                        <div >
                                            <p>Tipo de cambio</p>
                                        </div>
                                        <div style="display: flex;
        width: 100%;
        flex-direction: column;
        height: 100%;">
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p><b>Tasa</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p>${(recibo?.reciboRecibomodelo?.bcv)}</p>
                                                </div>
                                            </div>
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p><b>Fecha</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p>${moment(recibo?.reciboRecibomodelo?.Fecha).format('DD-MM-YYYY')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="width: 35%;
                display: flex;
                flex-direction: column;
                border-right: 0.1rem solid black;
                gap: 0.0rem;">
                                        <div>
                                            <p style="font-size: 0.8rem; text-align: center">TODOS JUNTOS Y EN ARMONIA
                                                TRABAJANDO DE LA MANO CON LA
                                                MESA DE TRABAJO (RECUPERACION
                                                DE LA PISCINA) PODREMOS
                                                RECUPERARLA PARA EL DISFRUTE
                                                DE TODOS.
                                            </p>
                                        </div>
                                    </div>
                                    <div style="width: 35%;
                display: flex;
                flex-direction: column;
                border-right: 0.1rem solid black;
                gap: 0.0rem;
                height: 100%;">
                                        <div>
                                            <p style="font-size: 0.8rem; text-align: center"> PARQUE RESIDENCIAL LOS BUCARES <br />
                                                RIF-31030581-1 <br />
                                                GUATIRE - ESTADO MIRANDA</p>
                                        </div>
                                        <div style="display: flex;
        width: 100%;
        flex-direction: column;
        height: 100%;">
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;
        font-size: 0.8rem;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p style="text-align: center"><b>N° DE CONTROL Y MES</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p>${moment(recibo?.Fecha).format('MM-YYYY')}</p>
                                                </div>
                                            </div>
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;
        font-size: 0.8rem;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p style="text-align: center"><b>PROPIETARIO</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p style="text-align: center">${data?.uservivienda?.nombre}</p>
                                                </div>
                                            </div>
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p style="text-align: center"><b>Nª DE Casa</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p>${data?.uservivienda?.nroCasa}</p>
                                                </div>
                                            </div>
                                            <div style="display: flex;
        gap: 0.0rem;
        width: 100%;
        border-top: 0.1rem solid black;
        height: 100%;">
                                                <div style="width: 40%;
                            display: flex;
                            gap: 0.5rem;
                            justify-content: center;
                            align-items: center;
                            background: rgba(167, 166, 166, 0.596);
                            height: 100%;">
                                                    <p style="text-align: center"><b>Estatus</b></p>
                                                </div>
                                                <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                    <p>${data?.uservivienda?.viviendaRecibo?.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 3rem;">
                                    <div style="display: flex;
                width: 100%;
                flex-direction: column;
                height: 100%;">
                                        <div style="display: flex;
                    gap: 0.0rem;
                    width: 100%;
                    height: 100%;">
                                            <div style="width: 40%;
                        display: flex;
                        gap: 0.5rem;
                        justify-content: center;
                        align-items: center;
                        background: rgba(167, 166, 166, 0.596);
                        height: 100%;">
                                                <p><b>Correo</b></p>
                                            </div>
                                            <div style="width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;">
                                                <p>${data?.correo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 2rem;">
                                    <div style="width: 40%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div id="miContenedor"></div>
                                            <p>Descripcion de gastos</p>
                                        </div>
                                        <div id="miContenedor1">
                                            ${contenidoHTML}
                                        </div>
                                    </div>
                                    <div style="
                height: 100%;
                width: 12%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;">
                                        <div>
                                            <p>Monto $</p>
                                        </div>
                                        <div id="miContenedor1">
                                            ${contenidoHTML1}
                                        </div>
                                    </div>
                                    <div style="width: 13%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div>
                                            <p>Alicuota $</p>
                                        </div>
                                        <div id="miContenedor1">
                                        ${contenidoHTML2}
                                    </div>
                                    </div>
                                    <div style="width: 18%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div>
                                            <p>Monto Bs</p>
                                        </div>
                                        <div id="miContenedor1">
                                        ${contenidoHTML3}
                                    </div>
                                    </div>
                                    <div style="width: 17%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div>
                                            <p>Alicuota Bs</p>
                                        </div>
                                        <div id="miContenedor1">
                                        ${contenidoHTML4}
                                    </div>
                                    </div>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 100%;">
                                    <div style="width: 40%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Sub Total:</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>10% Fondo Reserva:</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Total Gastos</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p><b>Total Recibo</b></p>
                                        </div>
                                    </div>
                                    <div style="
                height: 100%;
                width: 12%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalmontodolares).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalmontodolares * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>${(totalmontodolares + totalmontodolares * (10 / 100).toFixed(2))}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalmontodolares + totalmontodolares * (10 / 100).toFixed(2))}</p>
                                        </div>
                                    </div>
                                    <div style="width: 13%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${((totalalicuotadolares).toFixed(2))}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalalicuotadolares + totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${(totalalicuotadolares + totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div style="width: 18%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalmontoBs).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalmontoBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalmontoBs + totalmontoBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalmontoBs + totalmontoBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div style="width: 17%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalalicuotaBs).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalalicuotaBs + totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs ${(totalalicuotaBs + totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 100%;">
                                    <div>
                                        <p style="font-size: 1rem; text-align: center">Este monto podrá efectuarse su pago en
                                            dolares, o en bolívares previa consulta del sitio
                                            web del Banco Central de Venezuela, (BCV), y deberá pagarse a la tasa de cambio oficial
                                            del día del pago, multiplicando el monto en dólares expresado en este recibo de
                                            condominio.</p>
                                    </div>
                                </div>
                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 100%;">
                                    <div style="width: 55%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p style="font-size: 0.8rem; text-align: center"> {* EL TIPO DE CAMBIO REFERENCIAL
                                                APLICADO ES DE Bs.D.${recibo.reciboRecibomodelo?.bcv}
                                                DE FECHA VALOR ${moment(recibo?.reciboRecibomodelo?.Fecha).format('DD/MM/YYYY')}, SEGUN RES.N°.19-05-01 DEL
                                                BCV(GAC.OFIC.
                                                N°.41.624 : 02 /05 / 2019) Y DE CONFORMIDAD CON LO PREVISTO EN LAS
                                                NORMAS GENERALES DE EMISION DE FACTURAS Y OTROS DOCUMENTOS.
                            (GAC.OFIC.NRO. 39.795 DEL 08 / 11 / 11)}
                                            </p>
                                        </div>
                                    </div>
                                    <div style="width: 30%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Base Imponible:</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>I.V.A.:</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Total:</p>
                                        </div>
                                        <div style="display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.1rem solid black;
        width: 100%;
        height: 100%;">
                                            <div style="display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-right: 0.1rem solid black;">
                                                <p>Tasa</p>
                                            </div>
                                            <div style="display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;">
                                                <p style={{ fontSize: "0.6rem", textAlign: "center" }}>Base <br /> Imponible:</p>
                                            </div>
                                        </div>
                                        <div style="display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0.1rem solid black;
        width: 100%;
        height: 100%;">
                                            <div style="display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-right: 0.1rem solid black;">
                                                <p>0,00% </p>
                                            </div>
                                            <div style="display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;">
                                                <p style="font-size: 0.75rem; text-align: center">Bs. ${(totalmontoBs + totalmontoBs *
        (10 / 100)).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="width: 30%;
        display: flex;
        flex-direction: column;
        border-right: 0.1rem solid black;
        gap: 0.0rem;
        height: 100%;">
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${totalmontodolares + totalmontodolares * (10 / 100).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$0,00</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>$ ${totalmontodolares + totalmontodolares * (10 / 100).toFixed(2)}</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>I.V.A.;</p>
                                        </div>
                                        <div style=" display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    height: 100%;">
                                            <p>Bs.D 0,00</p>
                                        </div>
                                    </div>
                                </div>

                                <div style="display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
    height: 100%;">
                                    <div style="display: flex;
                justify-content: flex-start;
                padding: 0.1rem 0 0 1rem;
                width: 100%;
                height: 8rem;
                border: none;">
                                        <div >
                                            <p style="font-size: 0.8rem; text-align: center">
                                                FIRMA/SELLO/JUNTA DE CONDOMINIO
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>`

module.exports = recibocondominio;
