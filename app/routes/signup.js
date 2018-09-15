'use strict';

import express from 'express';
import SignupController from '../controllers/signup';

const router = express.Router();
router.post('/', SignupController.signup);

module.exports = router;
