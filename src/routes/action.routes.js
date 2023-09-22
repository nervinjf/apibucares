const { Router } = require("express");
const { reciboModelo, reciboEnv } = require("../controllers");

const router = Router();

router.get('/recibomodelo/action/:id', reciboModelo);
router.get('/recibo/action/:id', reciboEnv);

module.exports = router;