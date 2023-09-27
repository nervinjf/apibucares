const { Router } = require("express");
const { reciboModelo, reciboEnv, reciboDownload } = require("../controllers");

const router = Router();

router.get('/recibomodelo/action/:id', reciboModelo);
router.get('/recibo/action/:id', reciboEnv);
router.get('/recibo/download/action/:id/:userId', reciboDownload);

module.exports = router;