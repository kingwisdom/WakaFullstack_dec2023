const express = require('express')
const cors = require('cors')

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
   // origin: 'https://wakaadmin.vercel.app'
}


app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

 //router
const router = require('./routes/placeRouter.js');
const catrouter = require('./routes/catRouter.js');
const cityrouter = require('./routes/cityRouter.js');
app.use('/api/place', router);
app.use('/api/category', catrouter);
app.use('/api/city', cityrouter);


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
//app.listen();
