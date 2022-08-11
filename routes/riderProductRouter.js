const router = require('express').Router();
const riderProductController = require('../controllers/riderProductController');

// get full list of products purchased by all riders
router.route('/').get(riderProductController.index);
//route to get details about a specific rider's products
router.route('/:id').get(riderProductController.productsForOneRider); 
// record product purchased by a rider
router.route('/').post(riderProductController.new);
// route to update riderProduct
// route to delete riderProduct

module.exports = router;