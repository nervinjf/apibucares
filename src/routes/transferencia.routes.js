const { Router } = require("express");
const { GetTransferencia, Registertransferencia, UpdateTransferencia, DeleteTransferencia } = require("../controllers");

const router = Router();

router.get('/gt/transferencia', GetTransferencia);
router.post('/pst/transferencia/:id/:userId', Registertransferencia);
router.put('/pt/transferencia/:id', UpdateTransferencia);
router.delete('/dlt/transferencia/:id', DeleteTransferencia);

module.exports = router;