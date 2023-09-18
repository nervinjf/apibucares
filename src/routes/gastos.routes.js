const { Router } = require("express");
const { Getgastos, Registergastos, Updategastos, Deletegastos } = require("../controllers");

const router = Router();

router.get('/gt/gastos', Getgastos);
router.post('/pst/gastos', Registergastos);
router.put('/pt/gastos/:id', Updategastos);
router.delete('/dlt/gastos/:id', Deletegastos);

module.exports = router;