var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');
//var dogsController = require('../controllers/dogsController');


//router.get('/', indexController.dogsList);
router.get('/', function (req,res,next) {res.redirect('/dogs')});
router.get('/dogs', indexController.pages);

router.get('/dogs/:page', indexController.pages);
router.get('/dogs/:page/:id', indexController.dogDetails);
//router.get('/fav', indexController.faved);

//router.get('/favoritos', indexController.favoritos); //////

//router.get('/', indexController.getFilters);
//router.get('/:id',dogsController.dogDetails());
router.get('/favs/watched', indexController.faved);

//POST
router.post('/filtered', indexController.filterDogs);
router.post('/favs', indexController.getFaved);
//router.post('/fav', indexController.getFav);
//router.post('/filtered', indexController.getFiltersTwo);
//router.post('/filtered', indexController.getFilters);

module.exports = router;
