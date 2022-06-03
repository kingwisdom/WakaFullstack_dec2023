const CityController = require('../controller/CityController.js')

const router = require('express').Router();

//Swagger schema definitions

/**
 * @swagger
 * definitions:
 *   City:
 *     properties:
 *       id:
 *         type: uuid
 *       name:
 *         type: string
 * 
 */
//=============================================================================================================


/**
 * @swagger
 * /api/city:
 *   get:
 *     description: Get all cities
 *     responses:
 *       200:
 *         description: Array of cities
 *         schema:
 *           $ref: '#/definitions/City'
 * 
 */
router.get('/', CityController.getAllCities);

/**
 * @swagger
 * /api/city:
 *   post:
 *     description: Create a new City
 *     parameters:
 *       - name: city
 *         description: city Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/City'
 *     responses:
 *       201:
 *         description: Successfully Created
 * 
 */
router.post('/', CityController.addCity);


module.exports = router;