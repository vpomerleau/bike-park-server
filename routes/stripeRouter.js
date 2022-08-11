const router = require('express').Router();
const stripeController = require('../controllers/stripeController');

// get details of a payment intent/transaction from stripe
router.route('/retrieve-payment-intent/:id').get(stripeController.paymentDetails);
// create a new payment intent with stripe
router.route('/create-payment-intent').post(stripeController.new);

module.exports = router;