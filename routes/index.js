var express = require('express');
var router = express.Router();

var indexController = require('../controllers/indexController');
//var dogsController = require('../controllers/dogsController');


router.get('/', indexController.dogsList);
//router.get('/:id', indexController.dogDetails);

router.get('/:page', indexController.pages);
router.get('/:page/:id', indexController.dogDetails);
//router.get('/:id',dogsController.dogDetails());

module.exports = router;
