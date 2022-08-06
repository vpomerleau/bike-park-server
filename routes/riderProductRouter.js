const router = require('express').Router();
const riderProductController = require('../controllers/riderProductController');

router.route('/').get(riderProductController.index);
router.route('/:rider-id').get(riderProductController.index); //route to get a specific riders' products
router.route('/').post(riderProductController.new);
// route to update riderProduct
// route to delete riderProduct

module.exports = router;