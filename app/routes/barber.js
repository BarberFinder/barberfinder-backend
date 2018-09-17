'use strict';

import express from 'express';
import BarberController from '../controllers/barber';
import authHelper from '../middleware/auth';

const router = express.Router();
router.post('/create', authHelper.isAuthenticated, BarberController.create);
router.get('/', authHelper.isAuthenticated, BarberController.get);
router.get('/list', authHelper.isAuthenticated, BarberController.getBarberShopList);

module.exports = router;
