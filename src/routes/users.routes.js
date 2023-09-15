const { Router } = require("express");
const { RegisterUsers, getuserId } = require("../controllers");

const router = Router();

router.get("/gt/users/:id",  getuserId);
router.post('/pst/users', RegisterUsers);

module.exports = router;