'use strict';

import express from 'express';
import ReservationController from '../controllers/reservation';
import authHelper from '../middleware/auth';

const router = express.Router();
router.post('/create', authHelper.isAuthenticated, ReservationController.create);
router.get('/', authHelper.isAuthenticated, ReservationController.getReservationByUserId);

module.exports = router;
