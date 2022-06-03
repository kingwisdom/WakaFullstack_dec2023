const express = require('express')
const cors = require('cors')


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition:{
      info:{
          title:'Waka App',
          version:'1.0.0'
      }
  },
  apis: ['routes/placeRouter.js', 'routes/catRouter.js', 'routes/cityRouter.js']
};

//Swagger Docs
const swaggerDocument = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocument);

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
   // origin: 'https://wakaadmin.vercel.app'
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

 //router
const placerouter = require('./routes/placeRouter.js');
const catrouter = require('./routes/catRouter.js');
const cityrouter = require('./routes/cityRouter.js');
app.use('/api/place', placerouter);
app.use('/api/category', catrouter);
app.use('/api/city', cityrouter);
//app.use('/api/city', cityrouter);



//port
const PORT = process.env.PORT || 5000

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
//app.listen();
