const router = require('express').Router();
const riderController = require('../controllers/riderController');

router.route('/').get(riderController.index);
// router.route('/:email').get(riderController.riderByEmail);
router.route('/').post(riderController.new);
// route to update rider
// route to delete rider

module.exports = router;