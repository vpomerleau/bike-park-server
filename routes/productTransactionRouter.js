const router = require('express').Router();
const productTransactionController = require('../controllers/productTransactionController');

// get all product transactions
router.route('/').get(productTransactionController.index);
// get products purchased for one transaction
router.route('/:transactionId').get(productTransactionController.index);
// add product details for one transaction
router.route('/').post(productTransactionController.new);
// route to update productTransaction
// route to delete productTransaction

module.exports = router;