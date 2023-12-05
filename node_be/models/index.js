const dbConfig = require('../config/dbConfig')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorAliases:false, 

        pool:{
            min:dbConfig.pool.min,
            max:dbConfig.pool.max,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=> {
    console.log('connected');
}).catch(err => {
    console.log("Err", err);
})

const db = {}

db.sequelize = Sequelize
db.sequelize = sequelize

db.category = require('./categoryModel.js')(sequelize,DataTypes)
db.places = require('./placesModel.js')(sequelize,DataTypes)
db.cities = require('./cityModel.js')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(() => {
    console.log("re-sync done!");
})

module.exports = db;