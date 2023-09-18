const { Router } = require("express");
const { GetRmodel, RegisterRmodel, UpdateRmodel, DeleteRmodel } = require("../controllers");

const router = Router();

router.get('/gt/recibomodel', GetRmodel);
router.post('/pst/recibomodel', RegisterRmodel);
router.put('/pt/recibomodel/:id', UpdateRmodel);
router.delete('/dlt/recibomodel/:id', DeleteRmodel);

module.exports = router;