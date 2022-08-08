const router = require('express').Router();
const riderProductController = require('../controllers/riderProductController');

router.route('/').get(riderProductController.index);
router.route('/:id').get(riderProductController.productsForOneRider); //route to get details about a specific rider's products
router.route('/').post(riderProductController.new);
// route to update riderProduct
// route to delete riderProduct

module.exports = router;