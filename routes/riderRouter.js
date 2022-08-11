const router = require('express').Router();
const riderController = require('../controllers/riderController');

// get list of all rider accounts
router.route('/').get(riderController.index);
// add a new rider account
router.route('/').post(riderController.new);
// route to update rider
// route to delete rider

module.exports = router;