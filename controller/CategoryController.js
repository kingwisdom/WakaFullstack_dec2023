const db = require('../models')

const Category = db.category;

const addCategory = async(req, res) => {
    let model = {
        name:req.body.name 
    }

    const cats = await Category.create(model);
    res.status(200).send({
        status: true,
        response: "Category Posted Successfully!",
        returnObj:null
    });
    console.log(cats);
}

const getAllCategory = async(req, res) =>{
    let cats = await Category.findAll({});
    res.status(200).send(cats);
}


module.exports = {
    addCategory,
    getAllCategory
}