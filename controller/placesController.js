const uuid = require('uuid');
const { places } = require('../models');
const db = require('../models')
const filePlaces = require('./places')

const Places = db.places;
 
const addPlaces = async (req, res) => {
    let model = {
        id: uuid.v4(),
        imageUrl:req.body.imageUrl,
        name:req.body.title,
        address:req.body.address,
        categoryId:req.body.category,
        cityId:req.body.city,
        phoneNumber:req.body.phoneNumber,
        searchedTimes:req.body.searchedTimes,
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
    console.log('my places', places)
    res.status(200).send(places);
}

const getAPlace = async(req, res) =>{
    let id = req.params.id;
    let place = await Places.findOne({where: {id: id}});
    res.status(200).send(place);
}

const getPlaceInCategory = async(req, res) =>{
    let catId = req.params.categoryId;
    let place = await Places.findAll({where: {categoryId: catId}});
    res.status(200).send({
        status: true,
        response: null,
        returnObj:place
    });
} 
const getPlaceInCities = async(req, res) =>{
    let cId = req.params.cityId;
    let place = await Places.findAll({where: {cityId: cId}});
     
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
    let theUpdatePlace = await Places.findOne({where: {id: id}});
    res.status(200).send(theUpdatePlace);
}


//delete
const deletePlace = async(req, res) =>{
    let id = req.params.id;
    await Places.destroy({where: {id: id}});
    res.status(200).send("place has been deletd");
}

const bulkPlaceUploadFromFile = async(req, res) =>{
    let assertain = req.params.isTest;
    console.log(assertain);
    if (assertain == 'true') {
        for (let i = 0; i < filePlaces.length; i++) {
            let model = {
                id: filePlaces[i].Id,
                imageUrl:filePlaces[i].ImageUrl,
                name:filePlaces[i].Name,
                address:filePlaces[i].FullAddress,
                categoryId:filePlaces[i].categoryId,
                cityId:filePlaces[i].CityId,
                phoneNumber:filePlaces[i].PhoneNumber,
                searchedTimes:filePlaces[i].SearchedTimes,
                postedBy:filePlaces[i].PostedBy
            }
            const pp = await places.create(model);      
        }
        res.status(200).send({
            status: true,
            response: "Bulk Upload Successful"
        });
    } else {
        res.status(200).send("The Api is up and running");
    }
}



module.exports = {
    addPlaces,
    getAPlace,
    getAllPlaces,
    getPlaceInCategory,
    getPlaceInCities,
    updatePlace,
    deletePlace,
    bulkPlaceUploadFromFile
}