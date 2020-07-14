const express = require('express');
const router = express.Router()
const ctrl = require("../controllers");

const authRequired = require("../middleware/authRequired");

router.post("/register", ctrl.auth.register);
router.post("/login", ctrl.auth.login);
router.get("/profile", authRequired, ctrl.auth.profile);
router.delete('/logout', authRequired, ctrl.auth.logout);

module.exports = router;