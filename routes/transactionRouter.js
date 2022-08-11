const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

// get all transactions
router.route('/').get(transactionController.index);
// get details of one transaction
router.route('/:id').get(transactionController.transactionById);
// record new transaction
router.route('/').post(transactionController.new);
// route to update transaction
// route to delete transaction

module.exports = router;