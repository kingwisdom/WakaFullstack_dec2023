const db = require('../models')

const Places = db.places;

const addPlaces = async (req, res) => {
    let model = {
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        address:req.body.address,
        category:req.body.category,
        website:req.body.website,
        phoneNumber:req.body.phoneNumber,
        published:req.body.published ? req.body.published : false
    }

    // publicPaces.forEach(element => {
    //     let model = {
    //         title:element.Name,
    //         code:element.Id,
    //         imageUrl:'https://i.pinimg.com/474x/cd/8f/e4/cd8fe461b6d848f56513578020fe3c96.jpg',
    //         city:'Lagos',
    //         address:element.FullAddress,
    //         category:element.Description,
    //         website:"",
    //         phoneNumber:"08167927876",
    //         published:true
    //     }
    //      Places.create(model);
    // });

    const place = await Places.create(model);
    res.status(200).send(place);

    //console.log(place);
}

const getAllPlaces = async(req, res) =>{
    let places = await Places.findAll({});
    res.status(200).send(places);
}

const getAPlace = async(req, res) =>{
    let id = req.params.id;
    let place = await Places.findOne({where: {id: id}});
    res.status(200).send(place);
}

const getPlaceInCategory = async(req, res) =>{
    let category = req.body.category;
    console.log(category);
    let place = await Places.findAll({where: {category: category}});
    res.status(200).send(place);
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
    updatePlace,
    deletePlace
}