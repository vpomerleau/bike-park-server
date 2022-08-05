const router = require('express').Router();
const stripeController = require('../controllers/stripeController');

// router.route('/').get(stripeController.index);
router.route('/create-payment-intent').post(stripeController.new);

module.exports = router;