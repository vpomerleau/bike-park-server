const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.route('/').get(transactionController.index);
router.route('/:id').get(transactionController.transactionById);
router.route('/').post(transactionController.new);
// route to update transaction
// route to delete transaction

module.exports = router;