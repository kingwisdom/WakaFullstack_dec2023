import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Waka App',
      version: '1.0.0',
    },
  },
  apis: ['routes/placeRouter.js', 'routes/catRouter.js', 'routes/cityRouter.js'],
};

// Swagger Docs
const swaggerDocument = swaggerJsDoc(swaggerOptions);

const app = express();

const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL }));

// Router
import placerouter from './routes/placeRouter.js';
app.use('/api/place', placerouter);

// Port
const PORT = process.env.PORT || 5000;

// Server
//app.listen();
app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
});