const { Router } = require("express");
const { RegisterAbs, UpdateAbs, DeleteAbs, GetAbs } = require("../controllers");

const router = Router();

router.get('/gt/abastecimiento', GetAbs);
router.post('/pst/abastecimiento', RegisterAbs);
router.put('/pt/abastecimiento/:id', UpdateAbs);
router.delete('/dlt/abastecimiento/:id', DeleteAbs);

module.exports = router;