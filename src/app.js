const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const initModels = require('./models/initModels');
const handleError = require("./middlewares/error.middleware");
const transporter = require('./utils/mailer');
const moment = require('moment');
const { Registertasa } = require("./controllers/tasapost.controllers");
const { authRoutes, TasaRoutes, TasaPostRoutes, TransferenciaRoutes, UserRoutes, RolRoutes, AbsRoutes, PrelRoutes, ReciboMRoutes, GastosRoutes, ActionRoutes, ReciboRoutes, ViviendaRoutes } = require("./routes");
require("moment-timezone");
moment.locale('es-VE');
moment.tz.setDefault("America/Caracas");
const cron = require("node-cron");

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: ['https://bucares.netlify.app', 'http://localhost:5173'],
}));

initModels();

db.authenticate()
    .then(() => console.log('autenticacion exitosa'))
    .catch((error) => console.log(error));

db.sync({ alter: true })
    .then(() => console.log('BD sincronizada'))
    .catch((error) => console.log(error))

transporter
    .verify()
    .then(() => console.log("Servicio activo para envio de correo"));

app.get("/", (req, res) => {
    const localidad = moment.tz.guess();
    res.send(`¡Hola Mundo! Estamos en  ${localidad}`);
})

app.use("/api/v1/bucares", authRoutes)
app.use('/api/v1/bucares', UserRoutes)
app.use('/api/v1/bucares', RolRoutes)
app.use('/api/v1/bucares', AbsRoutes)
app.use('/api/v1/bucares', PrelRoutes)
app.use('/api/v1/bucares', ReciboMRoutes)
app.use('/api/v1/bucares', GastosRoutes)
app.use('/api/v1/bucares', ActionRoutes)
app.use('/api/v1/bucares', ViviendaRoutes)
app.use('/api/v1/bucares', ReciboRoutes)
app.use('/api/v1/bucares', TransferenciaRoutes)
app.use('/api/v1/bucares', TasaRoutes)

cron.schedule('0 10 * * 1-5', () => {
    console.log("hola")
    Registertasa({}, {}, {})
    .then(() => {
        console.log("Registro de tasa completado."); // Acción después de que la función del controlador se complete
    })
    .catch(error => {
        console.error(error); // Maneja cualquier error que ocurra durante la ejecución de la función del controlador
    });
}, {
    scheduled: true,
    timezone: "America/Caracas"
});



app.use(handleError);

module.exports = app;
