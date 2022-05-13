const { randomUUID } = require('crypto');
const db = require('../models')

const Places = db.places;
 
const addPlaces = async (req, res) => {
    let model = {
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        code: randomUUID(),
        address:req.body.address,
        category:req.body.category,
        city:req.body.city,
        phoneNumber:req.body.phoneNumber,
        published:req.body.published ? req.body.published : false,
        postedBy:req.body.postedBy
    }

    // publicPaces.forEach(element => {
    //     let model = {
    //         title:element.Name,
    //         uniqueId:randomUUID(),
    //         imageUrl:element.ImageUrl,
    //         city:element.City.Name,
    //         address:element.FullAddress,
    //         category:element.Description,
    //         phoneNumber:element.PhoneNumber,
    //         published:true,
    //         postedBy: element.PostedBy
    //     }
    //      Places.create(model);
    // });

    const place = await Places.create(model);
    res.status(200).send({
        status: true,
        response: "Place Posted Successfully!",
        returnObj:place
    });
    
    //console.log(place);
}

const getAllPlaces = async(req, res) =>{
    let places = await Places.findAll({});
    res.status(200).send(places);
}

const getAPlace = async(req, res) =>{
    let id = req.params.id;
    let place = await Places.findOne({where: {uniqueId: id}});
    res.status(200).send(place);
}

const getPlaceInCategory = async(req, res) =>{
    let category = req.params.category;
    console.log(category);
    let place = await Places.findAll({where: {category: category}});
     
    res.status(200).send({
        status: true,
        response: null,
        returnObj:place
    });
} 
const getPlaceInCities = async(req, res) =>{
    let city = req.params.city;
    console.log(city);
    let place = await Places.findAll({where: {city: city}});
     
    res.status(200).send({
        status: true,
        response: null,
        returnObj:place
    });
} 

//update
const updatePlace = async(req, res) =>{
    let id = req.params.id;
    let place = await Places.update(req.body,{where: {id: id}});
    res.status(200).send(place);
}


//delete
const deletePlace = async(req, res) =>{
    let id = req.params.id;
    await Places.destroy({where: {id: id}});
    res.status(200).send("place has been deletd");
}

module.exports = {
    addPlaces,
    getAPlace,
    getAllPlaces,
    getPlaceInCategory,
    getPlaceInCities,
    updatePlace,
    deletePlace
}