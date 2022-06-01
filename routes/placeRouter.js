const placesController = require('../controller/placesController.js')

const router = require('express').Router();

//Swagger schema definitions

/**
 * @swagger
 * definitions:
 *   Place:
 *     properties:
 *       id:
 *         type: string
 *       imageUrl:
 *         type: string
 *       name:
 *         type: string
 *       categoryId:
 *         type: string
 *       cityId:
 *         type: string
 *       address:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       searchedTimes:
 *         type: integer
 *       postedBy:
 *         type: string
 * 
 */






/**
 * @swagger
 * /api/place/allPlaces:
 *   get:
 *     description: Get all places
 *     responses:
 *       200:
 *         description: Array of places
 *         schema:
 *           $ref: '#/definitions/Place'
 * 
 */
router.get('/allPlaces', placesController.getAllPlaces);

/**
 * @swagger
 * /api/place/addPlaces:
 *   post:
 *     description: Create a new place
 *     parameters:
 *       - name: place
 *         description: Place Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Place'
 *     responses:
 *       201:
 *         description: Successfully Created
 * 
 */
router.post('/addPlaces', placesController.addPlaces);
router.get('/categoryplace/:category', placesController.getPlaceInCategory);
router.get('/cityplace/:city', placesController.getPlaceInCities);

router.get('/:id', placesController.getAPlace);
router.get('/:id', placesController.updatePlace);
router.get('/:id', placesController.deletePlace);



module.exports = router;