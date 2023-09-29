const { Router } = require("express");
const { Gettasa, Gettasahoy } = require("../controllers");

const router = Router();

router.get('/gt/tasabcv', Gettasa);
router.get('/gt/tasabcv/hoy', Gettasahoy);

module.exports = router;