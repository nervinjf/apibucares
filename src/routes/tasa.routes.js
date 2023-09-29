const { Router } = require("express");
const { Gettasa } = require("../controllers");

const router = Router();

router.get('/gt/tasabcv', Gettasa);

module.exports = router;