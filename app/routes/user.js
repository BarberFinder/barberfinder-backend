'use strict';

import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();
router.get('/', UserController.getCurrentUser);

module.exports = router;
