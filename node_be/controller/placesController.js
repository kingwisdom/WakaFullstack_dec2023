/* TODO: Create another engine for Places
     - create a STORE for places where selected places from FE will be stored
        dis: Scenerio 1 = user search will return matches from STORE, if matches cant be found, call Places API and return
        matches(mark the response as need-to-save). When user selects(clicking visit button) a place from
        "need-to-save" places, FE will make a call to BE to save the place in our STORE
        Scenerio 2 = user search will return matches from STORE, matches may be found but user wants to 
        see more(FE will add see more... button), then call Places API and return matches(mark the response as need-to-save). When user selects(clicking visit button) a place from
        "need-to-save" places, FE will make a call to BE to save the place in our STORE
        - Step: create storeconfig file: perform CRUD on the data here
        - Step: create places API processor file: call virtual earth places here and refine the response
        - Implement places controller methods for the new STORE
    AI chat can be useful if people want to know historical facts about places
*/

import { writePlacesToFile, readPlacesFromFile } from '../config/storeConfig.js';
import { getLocations } from '../config/placesapiprocessor.js';
import { v4 as uuidv4 } from 'uuid';
const Places = readPlacesFromFile();

const addPlaces = async (req, res) => {
    let model = {
        id: uuidv4(),
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        address: req.body.address,
        category: req.body.category,
        city: req.body.city,
        phoneNumber: req.body.phoneNumber || 'NA',
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        searchedTimes: req.body.searchedTimes,
        postedBy: req.body.postedBy
    }
    
    await writePlacesToFile(model);

    res.status(200).send({
        status: true,
        response: "Place Posted Successfully!",
        needsave: true,
        returnObj: model
    });
};

const getAllPlaces = async (req, res) => {
    await Places.then(places => {
        console.log('my places', places);
        res.status(200).send(places);
    });
};

const getPlacefromPlacesAPI = async (req, res) => {
    const apidata = await getLocations(req.query.loc);
    res.status(200).send(apidata);
};



const getPlaceCategorization = async (req, res) => {
    // let sql = 'SELECT waka_db.categories.name AS categoryName, waka_db.places.id AS placeId FROM waka_db.categories JOIN waka_db.places ON waka_db.categories.id = waka_db.places.categoryId;';
    // let placeCat = await db.sequelize.query(sql);
    // let grouping = placeCat[0].reduce((group, place) => {
    //     const { categoryName } = place;
    //     group[categoryName] = group[categoryName] ?? [];
    //     group[categoryName].push(place);
    //     return group;
    // }, {});
    // let resModel = [];
    // Object.entries(grouping).forEach(element => {
    //     resModel.push({ categoryName: element[0], count: element[1].length });
    // });
    res.status(200).send({
        status: true,
        response: "Successful",
        // returnObj: resModel
    });
};

const getAPlace = async (req, res) => {
    // let id = req.params.id;
    // let place = await Places.findOne({ where: { id: id } });
    // res.status(200).send(place);
    res.status(200).send();
};

const getPlaceInCategory = async (req, res) => {
    // let catId = req.params.categoryId;
    // let place = await Places.findAll({ where: { categoryId: catId } });
    res.status(200).send({
        status: true,
        response: null,
        // returnObj: place
    });
};

const getPlaceInCities = async (req, res) => {
    // let cId = req.params.cityId;
    // let place = await Places.findAll({ where: { cityId: cId } });
    res.status(200).send({
        status: true,
        response: null,
        // returnObj: place
    });
};

// Update
const updatePlace = async (req, res) => {
    // let id = req.params.id;
    // let place = await Places.update(req.body, { where: { id: id } });
    // let theUpdatePlace = await Places.findOne({ where: { id: id } });
    // res.status(200).send(theUpdatePlace);
    res.status(200).send("place has been updated");
};

// Delete
const deletePlace = async (req, res) => {
    // let id = req.params.id;
    // await Places.destroy({ where: { id: id } });
    res.status(200).send("place has been deleted");
};

const bulkPlaceUploadFromFile = async (req, res) => {
    let assertain = req.params.isTest;
    console.log(assertain);
    if (assertain === 'true') {
        // for (let i = 0; i < filePlaces.length; i++) {
        //     let model = {
        //         id: filePlaces[i].Id,
        //         imageUrl: filePlaces[i].ImageUrl,
        //         name: filePlaces[i].Name,
        //         address: filePlaces[i].FullAddress,
        //         categoryId: filePlaces[i].categoryId,
        //         cityId: filePlaces[i].CityId,
        //         phoneNumber: filePlaces[i].PhoneNumber,
        //         searchedTimes: filePlaces[i].SearchedTimes,
        //         postedBy: filePlaces[i].PostedBy
        //     };
        //     const pp = await places.create(model);
        // }
        res.status(200).send({
            status: true,
            response: "Bulk Upload Successful"
        });
    } else {
        res.status(200).send("The API is up and running");
    }
};

// Export all functions as default
export default {
    addPlaces,
    getAPlace,
    getAllPlaces,
    getPlacefromPlacesAPI,
    getPlaceInCategory,
    getPlaceInCities,
    updatePlace,
    deletePlace,
    bulkPlaceUploadFromFile,
    getPlaceCategorization
};

