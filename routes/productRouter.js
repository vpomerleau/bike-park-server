const router = require('express').Router();
const productController = require('../controllers/productController');

router.route('/').get(productController.index);
// route to get specific product
router.route('/').post(productController.new);
// route to update product
// route to delete product

module.exports = router;