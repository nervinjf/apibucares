const { Router } = require("express");
const { GetVivienda, RegisterVivienda, UpdateVivienda, DeleteVivienda, GetIdVivienda} = require("../controllers");
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.get('/gt/vivienda', GetVivienda);
router.get('/gt/vivienda/:id', GetIdVivienda);
router.post('/pst/vivienda', RegisterVivienda);
router.put('/pt/vivienda/:id', UpdateVivienda);
router.delete('/dlt/vivienda/:id', DeleteVivienda);

module.exports = router;