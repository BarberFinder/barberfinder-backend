'use strict';

import express from 'express';
import BarberController from '../controllers/barber';
import authHelper from '../middleware/auth';
import upload from '../middleware/barber';

const router = express.Router();
router.post('/create', [ authHelper.isAuthenticated, upload.single('profile_image') ], BarberController.create);
router.get('/', authHelper.isAuthenticated, BarberController.getBarberShopByUserId);
router.get('/list', authHelper.isAuthenticated, BarberController.getBarberShopList);
router.get('/:barbershopId', authHelper.isAuthenticated, BarberController.getBarberShopById);
router.put(
	'/changeImage',
	[ authHelper.isAuthenticated, upload.single('profile_image') ],
	BarberController.changeImage
);
router.put('/edit/:barbershopId', upload.single('profile_image'), authHelper.isAuthenticated, BarberController.edit);
module.exports = router;
