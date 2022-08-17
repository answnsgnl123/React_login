const express = require('express');
const router = express.Router();

const ctrl = require('./apiRouter_ctrl')





router.get("/register",ctrl.get_api.register);



router.post("/register",ctrl.post_api.register);
router.post("/login",ctrl.post_api.login);


module.exports = router; 