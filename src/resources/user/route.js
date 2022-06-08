const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authMdw = require('../../middlewares/authJwt.mdw');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', authMdw.verifyToken, controller.getUser);
router.patch('/password', authMdw.verifyToken, controller.changePassword);

module.exports = router;
