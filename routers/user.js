const express = require('express');
const router = express.Router();

const userCtrller = require('../controllers/user');

router.post('/signup', userCtrller.signup);

router.post('/login', userCtrller.login);

module.exports = router;