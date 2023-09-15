const path = require('path');
const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
    console.log(`servidor corriendo en el puerto ${PORT}`);
});
  