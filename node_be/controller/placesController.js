const uuid = require('uuid');
const { places, cities,category } = require('../models');
const db = require('../models')
const filePlaces = require('./places')
const fileCats = require('./categories')

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

    const place = await Places.create(model);
    res.status(200).send({
        status: true,
        response: "Place Posted Successfully!",
        returnObj:place
    });
    
}

const getAllPlaces = async(req, res) =>{
    let places = await Places.findAll({});
    console.log('my places', places)
    res.status(200).send(places);
}

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

 const getPlaceCategorization = async(req, res) =>{
    let sql = 'SELECT productd_waka.categories.id AS categoryId, productd_waka.categories.name AS categoryName, productd_waka.places.id AS placeId FROM productd_waka.categories JOIN productd_waka.places ON productd_waka.categories.id = productd_waka.places.categoryId;'
    let placeCat = await db.sequelize.query(sql);
    let grouping = placeCat[0].reduce((group, place) => {
        const { categoryName } = place;
        group[categoryName] = group[categoryName] ?? [];
        group[categoryName].push(place);
        return group;
      }, {});
      let resModel = [];
      Object.entries(grouping).forEach(element => {
          resModel.push( {categoryId:element[1][0].categoryId, categoryName:element[0], count:element[1].length})
      });
    res.status(200).send({
        status: true,
        response: "Successful",
        returnObj:resModel
    });
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
    let city = []
    let categories = []

    //console.log(assertain);
    if (assertain == 'true') {
        for (let i = 0; i < filePlaces.length; i++) {
           
            let res = city.map(e => e.id === filePlaces[i].CityId)
                    let modCity = {
                        id : filePlaces[i].City.Id,
                        name : filePlaces[i].City.Name,
                    }
              if (!res[0]) {
                        city.push(modCity);
                    }
                // console.log(res);
            
            //categories.forEach((cat)=>{
                // let cars = categories.map(cat=> cat.name === filePlaces[i].Description)
                //     let catId = {
                //         id: cat.id,
                //         name:filePlaces[i].Description
                //     }

                //     console.log(catId);
                 
                //     if(!cars[0]){
                //         categories.push(catId);
                        
                //     }
                
           // })
            
            let model = { 
                id: filePlaces[i].Id,
                imageUrl:filePlaces[i].ImageUrl,
                name:filePlaces[i].Name,
                address:filePlaces[i].FullAddress,
                categoryId: fileCats.find(er=>er.name ==filePlaces[i].Description) !=null ? fileCats.find(er=>er.name ==filePlaces[i].Description).id : null, 
                cityId:filePlaces[i].CityId,
                phoneNumber:filePlaces[i].PhoneNumber,
                searchedTimes:filePlaces[i].SearchedTimes,
                postedBy:filePlaces[i].PostedBy
            }
             const pp = await places.create(model);  
        }

        //console.log("xategory",categories);
        //console.log("city:",city);

        city.forEach((c) => {
             cities.create(c); 
        })
        fileCats.forEach((c) => {
             category.create(c); 
        })
            
        // await category.create(categories);  

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
    bulkPlaceUploadFromFile,
    getPlaceCategorization
}