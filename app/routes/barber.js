'use strict';

import express from 'express';
import BarberController from '../controllers/barber';
import authHelper from '../middleware/auth';

const router = express.Router();
router.post('/create', authHelper.isAuthenticated, BarberController.create);
router.get('/', authHelper.isAuthenticated, BarberController.getBarberShopByUserId);
router.get('/list', authHelper.isAuthenticated, BarberController.getBarberShopList);
router.get('/:barbershopId', authHelper.isAuthenticated, BarberController.getBarberShopById);
router.put('/changeImage', authHelper.isAuthenticated, BarberController.changeImage);
module.exports = router;
