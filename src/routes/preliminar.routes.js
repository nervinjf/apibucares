const { Router } = require("express");
const { GetPrel, RegisterPrel, UpdatePrel, DeletePrel } = require("../controllers");
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.get('/gt/preliminar', authenticate ,GetPrel);
router.post('/pst/preliminar', RegisterPrel);
router.put('/pt/preliminar/:id', UpdatePrel);
router.delete('/dlt/preliminar/:id', DeletePrel);

module.exports = router;