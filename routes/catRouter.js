
const CategoryController = require('../controller/CategoryController.js')

const router = require('express').Router();


router.get('/allCategories', CategoryController.getAllCategory);
router.post('/addCategories', CategoryController.addCategory);


module.exports = router;