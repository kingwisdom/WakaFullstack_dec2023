//production
module.exports = {
    HOST:'localhost',
    USER:'productd_wakauser',
    PASSWORD:'Wakauser@2019',
    DB:'productd_waka',
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
