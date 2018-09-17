'use strict';

import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();
router.post('/verify-token', AuthController.verifyToken);
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

module.exports = router;
