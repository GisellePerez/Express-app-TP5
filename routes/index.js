var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');

router.get('/', function (req,res,next) {res.redirect('/dogs')});
router.get('/dogs', indexController.pages);
router.get('/dogs/:page', indexController.pages);
router.get('/dogs/dog/:id', indexController.dogDetails);
router.get('/favs/faved', indexController.faved);

//POST
router.post('/filtered', indexController.filterDogs);
router.post('/favs', indexController.getFaved);

module.exports = router;
