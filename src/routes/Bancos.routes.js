const { Router } = require("express");
const { getpagobdv, postpagobdv } = require("../controllers");

const router = Router();

router.get('/pagotarjeta/bdv/:id', getpagobdv);
router.post('/pagotarjeta/bdv', postpagobdv);

module.exports = router;