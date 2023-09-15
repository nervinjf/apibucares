const { Router } = require("express");
const { RegisterRol } = require("../controllers");

const router = Router();

router.post('/pst/rol', RegisterRol);

module.exports = router;