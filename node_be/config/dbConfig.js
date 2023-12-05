//production
module.exports = {
    HOST:'localhost',
<<<<<<< HEAD:node_be/config/dbConfig.js
    USER:'productd_wakauser',
    PASSWORD:'Wakauser@2019',
    DB:'productd_waka',
=======
    USER:'root',
    PASSWORD:'@Afe4132my@Afe4132my',
    DB:'waka_db',
>>>>>>> 59f6ecba84709880feb0ffdb8313a054eaf47277:config/dbConfig.js
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}

//development
// module.exports = {
//     HOST:'localhost',
//     USER:'root',
//     PASSWORD:'',
//     DB:'awari_db',
//     dialect:'mysql',

//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// }
