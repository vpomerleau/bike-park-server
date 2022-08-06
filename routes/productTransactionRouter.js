const router = require('express').Router();
const productTransactionController = require('../controllers/productTransactionController');

router.route('/').get(productTransactionController.index);
router.route('/:transactionId').get(productTransactionController.index);
router.route('/').post(productTransactionController.new);
// route to update productTransaction
// route to delete productTransaction

module.exports = router;