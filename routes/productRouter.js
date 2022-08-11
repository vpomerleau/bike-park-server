const router = require('express').Router();
const productController = require('../controllers/productController');

// get all products
router.route('/').get(productController.index);
// add a new product
router.route('/').post(productController.new);
// route to update product
// route to delete product

module.exports = router;