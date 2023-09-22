const { Router } = require("express");
const { GetRecibo, RegisterRecibo, UpdateRecibo, DeleteRecibo, GetIdRecibo } = require("../controllers");

const router = Router();

router.get('/gt/recibo', GetRecibo);
router.get('/gt/recibo/:id', GetIdRecibo);
router.post('/pst/recibo', RegisterRecibo);
router.put('/pt/recibo/:id', UpdateRecibo);
router.delete('/dlt/recibo/:id', DeleteRecibo);

module.exports = router;