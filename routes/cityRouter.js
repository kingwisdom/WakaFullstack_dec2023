const CityController = require('../controller/CityController.js')

const router = require('express').Router();


router.get('/allCities', CityController.getAllCities);
router.post('/addCity', CityController.addCity);


module.exports = router;