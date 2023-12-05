const db = require('../models')
const uuid = require('uuid')

const City = db.cities;

const addCity = async(req, res) => {
    let model = {
        id: uuid.v4(),
        name:req.body.name
    }

    const acity = await City.create(model);
    res.status(200).send({
        status: true,
        response: "City Posted Successfully!",
        returnObj:null
    });
}

const getAllCities = async(req, res) =>{
    let acity = await City.findAll({});
    res.status(200).send({
        status: true,
        response: "Success",
        returnObj:acity
    });
    //res.status(200).send(cats);
}


module.exports = {
    addCity,
    getAllCities
}