'use strict';

import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();
router.post('/verify-token', AuthController.verifyToken);

module.exports = router;
