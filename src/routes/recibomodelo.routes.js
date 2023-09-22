const { Router } = require("express");
const { GetRmodel, RegisterRmodel, UpdateRmodel, DeleteRmodel, GetIdRecibomodel } = require("../controllers");

const router = Router();

router.get('/gt/recibomodel', GetRmodel);
router.get('/gt/recibomodel/:id', GetIdRecibomodel);
router.post('/pst/recibomodel', RegisterRmodel);
router.put('/pt/recibomodel/:id', UpdateRmodel);
router.delete('/dlt/recibomodel/:id', DeleteRmodel);

module.exports = router;