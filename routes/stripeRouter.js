const router = require('express').Router();
const stripeController = require('../controllers/stripeController');

router.route('/retrieve-payment-intent/:id').get(stripeController.paymentDetails);
router.route('/create-payment-intent').post(stripeController.new);

module.exports = router;