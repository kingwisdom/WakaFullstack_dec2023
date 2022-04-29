const placesController = require('../controller/placesController.js')
const CategoryController = require('../controller/CategoryController.js')

const router = require('express').Router();

router.get('/allPlaces', placesController.getAllPlaces);
router.post('/addPlaces', placesController.addPlaces);
router.get('/categoryplace', placesController.getPlaceInCategory);

router.get('/:id', placesController.getAPlace);
router.get('/:id', placesController.updatePlace);
router.get('/:id', placesController.deletePlace);

router.get('/addCategories', CategoryController.getAllCategory);
router.post('/addCategories', CategoryController.addCategory);


module.exports = router;