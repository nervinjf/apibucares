const { Router } = require("express");
const { Registertasa } = require("../controllers");

const router = Router();

router.post('/pst/tasabcv', Registertasa);

module.exports = router;