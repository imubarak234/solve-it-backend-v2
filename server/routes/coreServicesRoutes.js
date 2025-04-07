const coreServiceController = require('../controllers/coreServicesController.js');
const apiLimiter = require('../middlewares/rateLimiter');
const express = require('express');

const router = express.Router();

router.post('/createCoreService', apiLimiter, coreServiceController.createCoreService);
router.put('/updateCoreService', apiLimiter, coreServiceController.updateCoreService);
router.get('/getCoreServices', apiLimiter, coreServiceController.getCoreService);

router.post('/createCoreServiceRating', apiLimiter, coreServiceController.createCoreServiceRating);
router.put('/updateCoreServiceRating', apiLimiter, coreServiceController.updateCoreServiceRating);
router.get('/getCoreServiceRatings', apiLimiter, coreServiceController.getCoreServiceRating);

router.post('/createCoreServicePayment', apiLimiter, coreServiceController.createCoreServicePayment);
router.put('/updateCoreServicePayment', apiLimiter, coreServiceController.updateCoreServicePayment);
router.get('/getCoreServicePayments', apiLimiter, coreServiceController.getCoreServicePayment);
router.put('/updateCoreServicePaymentStatus', apiLimiter, coreServiceController.coreServicePaymentStatusUpdate);


router.post('/createCoreServiceEscrows', apiLimiter, coreServiceController.createServicesEscrows);
router.put('/updateCoreServiceEscrows', apiLimiter, coreServiceController.updateServicesEscrows);
router.get('/getCoreServiceEscrows', apiLimiter, coreServiceController.getCoreServiceEscrows);
router.put('/updateCoreServiceEscrowsStatus', apiLimiter, coreServiceController.servicesEscrowsStatusUpdate);

router.post('/createCoreServiceCategory', apiLimiter, coreServiceController.createCoreServicesCategory);
router.put('/updateCoreServiceCategory', apiLimiter, coreServiceController.updateCoreServicesCategory);
router.get('/getCoreServiceCategories', apiLimiter, coreServiceController.getCoreServiceCategory);

router.post('/createCoreServiceBooking', apiLimiter, coreServiceController.createCoreServicesBooking);
router.put('/updateCoreServiceBooking', apiLimiter, coreServiceController.updateCoreServicesBooking);
router.get('/getCoreServiceBookings', apiLimiter, coreServiceController.getCoreServicesBooking);
router.put('/updateCoreServiceBookingStatus', apiLimiter, coreServiceController.BookingStatusUpdate);

module.exports = router;
