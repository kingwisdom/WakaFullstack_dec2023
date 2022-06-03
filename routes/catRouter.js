
const CategoryController = require('../controller/CategoryController.js')

const router = require('express').Router();

//Swagger schema definitions

/**
 * @swagger
 * definitions:
 *   Category:
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
 * /api/category:
 *   get:
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Array of categories
 *         schema:
 *           $ref: '#/definitions/Category'
 * 
 */
router.get('/', CategoryController.getAllCategory);

/**
 * @swagger
 * /api/category:
 *   post:
 *     description: Create a new Category
 *     parameters:
 *       - name: category
 *         description: category Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       201:
 *         description: Successfully Created
 * 
 */
router.post('/', CategoryController.addCategory);


module.exports = router;