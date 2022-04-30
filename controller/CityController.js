const db = require('../models')

const City = db.cities;

const addCity = async(req, res) => {
    let model = {
        name:req.body.name
    }

    const cats = await City.create(model);
    res.status(200).send({
        status: true,
        response: "City Posted Successfully!",
        returnObj:null
    });

    console.log(cats);
}

const getAllCities = async(req, res) =>{
    let cats = await City.findAll({});
    res.status(200).send({
        status: true,
        response: "",
        returnObj:cats
    });
    //res.status(200).send(cats);
}


module.exports = {
    addCity,
    getAllCities
}