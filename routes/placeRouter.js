const placesController = require('../controller/placesController.js')

const router = require('express').Router();

router.get('/allPlaces', placesController.getAllPlaces);
router.post('/addPlaces', placesController.addPlaces);
router.get('/categoryplace/:category', placesController.getPlaceInCategory);
router.get('/cityplace/:city', placesController.getPlaceInCities);

router.get('/:id', placesController.getAPlace);
router.get('/:id', placesController.updatePlace);
router.get('/:id', placesController.deletePlace);



module.exports = router;