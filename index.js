const express = require('express')
const cors = require('cors')

const app = express();

var corsOptions = {
    origin: 'https://localhost:8000'
}


app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

 //router
const router = require('./routes/placeRouter.js');
const catrouter = require('./routes/catRouter.js');
app.use('/api/places', router);
app.use('/api/category', catrouter);


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
