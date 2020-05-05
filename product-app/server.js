let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),

    dbConfig = require('./database/db');

mongoose.Promise =global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Confirmation Message

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

//Setting up port with express js

const router = require('./routes/product.routes')
   
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/product-app')));
app.use('/', express.static(path.join(__dirname, 'dist/products-app')));
app.use('/api', router)

//Setting UP Port

const port = process.env.PORT || 3000;

//Confirmation Message

const server = app.listen(port, () => {
    console.log('connected to port ' + port)
});

