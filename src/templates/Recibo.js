
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
    <style>
        .container-recibModeldetail{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.containerrecibomodelo-sect1{
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    gap: 1rem;
}

.containerrecibomodelo-sect2{
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerrecibomodelo-sect2-page{
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 1.22) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    /* overflow-y: scroll; */

}

.sect2-page{
    width: 100%;
    height: 100%;
}

.box2--preli2 {
    width: 100%;
    height: 100%;
    box-shadow: rgba(50, 50, 93, 0.034) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.041) 0px 18px 36px -18px inset;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.page {
    width: 100%;
    height: 95%;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    padding: 1rem;
}

.descripcion-prel{
    display: flex;
    width: 100%;
    overflow: hidden;
    border: 0.1rem solid black;
}

.descripcion-prel1 {
    display: flex;
    width: 100%;
}

.descripcion1-prel1 {
    width: 35%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.descripcion1-prel12 {
    width: 35%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
    
}

.descripcion1-prel122 {
    width: 35%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
    
}

.descripcion1-prel2 {
    width: 30%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
    height: 100%;
}

.descripcion-detail-prel{
        display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.1rem solid black;
    height: 2rem;
}

.descripcion1-prel3 {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 0.0rem;
}

.descripcion-prel1 {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;
}

.descripcion1-prel-relleno{
    display: flex;
    gap: 0.0rem;
    width: 100%;
    border-top: 0.1rem solid black;
    height: 3rem;

}

.descripcion-prel-style{
    border-top: 0.1rem solid black;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.descripcion-prel-style1234{
    border-bottom: 0.1rem solid black;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


.descripcion-detail-prel1{
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.descripcion-prel-style1{
    width: 40%;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    background: rgba(167, 166, 166, 0.596);
    height: 100%;

}

.descripcion-prel1-correo{
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;
}

.descripcion1-prel-relleno-correo{
    display: flex;
    gap: 0.0rem;
    width: 100%;
    height: 100%;
}

.descripcion1-prel1-2{
    width: 40%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.descripcion1-prel1-3{
    width: 12%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.total-prel1-4{
    width: 13%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}


.descripcion1-prel1-5{
    width: 18%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.total-prel1-6{
    width: 17%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.descripcion1-prel1-7{
    width: 55%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.descripcion1-prel1-8{
    width: 30%;
    display: flex;
    flex-direction: column;
    border-right: 0.1rem solid black;
    gap: 0.0rem;
}

.descripcion-detail-prel2-1{
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.1rem solid black;
    width: 100%;
    height: 100%;
}

.descripcion-detail-prel2-2{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1rem;
}

.descripcion-detail-prel2-2-2{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-right: 0.1rem solid black;
}

.descripcion1-prel1-72{
    display: flex;
    justify-content: flex-start;
    padding: 0.1rem 0 0 1rem;
    width: 100%;
    height: 3rem;
    border: none;
}

.descripcion-detail-prel12{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

    </style>
</head>

<body style="padding: 1rem; margin: 0; width: 97%; height: 100%;">
    <div class='box2--preli2'>
        <div class='page'>
            <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center;
                flex-direction: column">
                <h1 style="margin: 0">Recibo</h1>
                <p style="margin: 0; text-align: center; font-size: 1rem">FAVOR DEPOSITAR EN: <br />
                    BANCO DE VENEZUELA, CUENTA CORRIENTE # 0102-0109-81-0000300425, CORREO:
                    condominioparquebucare1@gmail.com <br />
                    "NO" DEPOSITAR EN LA CUENTA DEL BANCO OCCIDENTAL DE DESCUENTO, POR LOS MOMENTOS.</p>
            </div>
            <div class='descripcion-prel'>
                <div class='descripcion1-prel1'>
                    <img src="https://nebconnection.com/TEST/logo.png" alt="" width="100%" height="100%">
                    <div class="descripcion-prel-style">
                        <p>Tipo de cambio</p>
                    </div>
                    <div class='descripcion-prel1'>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p><b>Tasa</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p>{(recibo?.reciboRecibomodelo?.bcv)}</p>
                            </div>
                        </div>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p><b>Fecha</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p>{moment(recibo?.reciboRecibomodelo?.Fecha).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='descripcion1-prel122'>
                    <div class='descripcion-detail-prel12'>
                        <p style="font-size: 0.8rem; text-align: center">TODOS JUNTOS Y EN ARMONIA
                            TRABAJANDO DE LA MANO CON LA
                            MESA DE TRABAJO (RECUPERACION
                            DE LA PISCINA) PODREMOS
                            RECUPERARLA PARA EL DISFRUTE
                            DE TODOS.
                        </p>
                    </div>
                </div>
                <div class='descripcion1-prel12'>
                    <div class="descripcion-prel-style1234">
                        <p style="font-size: 0.8rem; text-align: center;"> PARQUE RESIDENCIAL LOS BUCARES <br />
                            RIF-31030581-1 <br />
                            GUATIRE - ESTADO MIRANDA
                        </p>
                    </div>
                    <div class='descripcion-prel1'>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p style="font-size: 0.6rem; text-align: center"><b>N° DE CONTROL Y MES</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p>{moment(recibo?.reciboRecibomodelo?.Fecha).format('MM-YYYY')}</p>
                            </div>
                        </div>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p style="font-size: 0.6rem; text-align: center"><b>PROPIETARIO</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p style="font-size: 0.9rem">{data?.uservivienda?.nombre}</p>
                            </div>
                        </div>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p style="font-size: 0.6rem; text-align: center"><b>Nª DE Casa</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p>{data?.uservivienda?.nroCasa}</p>
                            </div>
                        </div>
                        <div class='descripcion1-prel-relleno'>
                            <div class="descripcion-prel-style1">
                                <p style="font-size: 0.6rem; text-align: center"><b>Estatus</b></p>
                            </div>
                            <div class='descripcion-detail-prel1'>
                                <p>{recibo?.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='descripcion-prel'>
                <div class='descripcion-prel1-correo'>
                    <div class='descripcion1-prel-relleno-correo'>
                        <div class="descripcion-prel-style1">
                            <p><b>Correo</b></p>
                        </div>
                        <div class='descripcion-detail-prel1'>
                            <p>{data.correo}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class='descripcion-prel'>
                <div class='descripcion1-prel1-2'>
                    <div class="descripcion-prel-style">
                        <p>Descripcion de gastos</p>
                    </div>
                    <div id="miContenedor1">
                        ${contenidoHTML}
                    </div>
                </div>
                <div class='descripcion1-prel1-3'>
                    <div class="descripcion-prel-style">
                        <p>Monto $</p>
                    </div>
                    <div id="miContenedor1">
                        ${contenidoHTML1}
                    </div>
                </div>
                <div class='total-prel1-4'>
                    <div class="descripcion-prel-style">
                        <p>Alicuota $</p>
                    </div>
                    <div id="miContenedor1">
                        ${contenidoHTML2}
                    </div>
                </div>
                <div class='descripcion1-prel1-5'>
                    <div class="descripcion-prel-style">
                        <p>Monto Bs</p>
                    </div>
                    <div id="miContenedor1">
                        ${contenidoHTML3}
                    </div>
                </div>
                <div class='total-prel1-6'>
                    <div class="descripcion-prel-style">
                        <p>Alicuota Bs</p>
                    </div>
                    <div id="miContenedor1">
                        ${contenidoHTML4}
                    </div>
                </div>
            </div>
            <div class='descripcion-prel'>
                <div class='descripcion1-prel1-2'>
                    <div class='descripcion-detail-prel'>
                        <p>Sub Total:</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>10% Fondo Reserva:</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Total Gastos</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p><b>Total Recibo</b></p>
                    </div>
                </div>
                <div class='descripcion1-prel1-3'>
                    <div class='descripcion-detail-prel'>
                        <p>${totalmontodolares}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${(totalmontodolares * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${totalmontodolares + totalmontodolares * (10 / 100)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${totalmontodolares + totalmontodolares * (10 / 100)}</p>
                    </div>
                </div>
                <div class='total-prel1-4'>
                    <div class='descripcion-detail-prel'>
                        <p>${(totalalicuotadolares).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${(totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${(totalalicuotadolares + totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${(totalalicuotadolares + totalalicuotadolares * (10 / 100)).toFixed(2)}</p>
                    </div>
                </div>
                <div class='descripcion1-prel1-5'>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalmontoBs).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalmontoBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalmontoBs + totalmontoBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalmontoBs + totalmontoBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                </div>
                <div class='total-prel1-6'>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalalicuotaBs).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalalicuotaBs + totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs{(totalalicuotaBs + totalalicuotaBs * (10 / 100)).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <div class='descripcion-prel'>
                <div class=''>
                    <p style="font-size: 1rem; text-align: center">Este monto podrá efectuarse su pago en
                        dolares, o en bolívares previa consulta del sitio
                        web del Banco Central de Venezuela, (BCV), y deberá pagarse a la tasa de cambio oficial
                        del día del pago, multiplicando el monto en dólares expresado en este recibo de
                        condominio.</p>
                </div>
            </div>
            <div class='descripcion-prel'>
                <div class='descripcion1-prel1-7'>
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                        <p style="font-size: 0.8rem; text-align: center"> ${`* EL TIPO DE CAMBIO REFERENCIAL
                            APLICADO ES DE Bs.D. $recibo?.reciboRecibomodelo?.bcv}
                            DE FECHA VALOR ${moment(recibo?.reciboRecibomodelo?.Fecha).format('DD/MM/YYYY')}, SEGUN RES. N°. 19-05-01 DEL BCV
                            (GAC. OFIC.
                            N°. 41.624 : 02/05/2019) Y DE CONFORMIDAD CON LO PREVISTO EN LAS
                            NORMAS GENERALES DE EMISION DE FACTURAS Y OTROS DOCUMENTOS.
                            (GAC. OFIC. NRO. 39.795 DEL 08/11/11)`}
                        </p>
                    </div>
                </div>
                <div class='descripcion1-prel1-8'>
                    <div class='descripcion-detail-prel'>
                        <p>Base Imponible:</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>I.V.A.:</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Total:</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <div class='descripcion-detail-prel2-2-2'>
                            <p>Tasa</p>
                        </div>
                        <div class='descripcion-detail-prel2-2'>
                            <p style="font-size: 1rem; text-align: center">Base <br /> Imponible:</p>
                        </div>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <div class='descripcion-detail-prel2-2-2'>
                            <p>0,00% </p>
                        </div>
                        <div class='descripcion-detail-prel2-2'>
                            <p style="font-size: 0.75rem; text-align: center">Bs.{(totalmontoBs + totalmontoBs *
                                (10 / 100)).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div class='descripcion1-prel1-8'>
                    <div class='descripcion-detail-prel'>
                        <p>${totalmontodolares + totalmontodolares * (10 / 100)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>$0,00</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>${totalmontodolares + totalmontodolares * (10 / 100)}</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>I.V.A.;</p>
                    </div>
                    <div class='descripcion-detail-prel'>
                        <p>Bs.D 0,00</p>
                    </div>
                </div>
            </div>

            <div class='descripcion-prel'>
                <div class='descripcion1-prel1-72'>
                    <div class='descripcion-detail-prel256'>
                        <p style={{ fontSize: "0.8rem" , textAlign: "center" }}>
                            FIRMA/SELLO/JUNTA DE CONDOMINIO
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</body>

</html>`

module.exports = recibocondominio;
