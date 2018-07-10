var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');
//var dogsController = require('../controllers/dogsController');


//router.get('/', indexController.dogsList);
router.get('/', indexController.pages);

router.get('/:page', indexController.pages);
router.get('/:page/:id', indexController.dogDetails);
//router.get('/fav', indexController.faved);
router.get('/favoritos', indexController.favoritos);
//router.get('/', indexController.getFilters);
//router.get('/:id',dogsController.dogDetails());

//POST
router.post('/filtered', indexController.filterDogs);
//router.post('/fav', indexController.getFav);
//router.post('/filtered', indexController.getFiltersTwo);
//router.post('/filtered', indexController.getFilters);

module.exports = router;
