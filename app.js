//init The modules:
const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var cors = require('cors');



//app use cors to pass header params :
app.use(cors());


//create express app:
const app=express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())




// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});





//static files
app.use(express.static('./public'));
require('./app/routes/tasks.routes.js')(app);





//acces to root router / 
app.get('/',function (req,res){
    console.log("Testing the API !")
    return res.send({ error: true, message: 'Texting The API ' })
})


// all other requests redirect to 404
app.all("*", function (req, res, next) {
    console.log("ERROR 404 !")
    return res.send({ error: true, message: 'Route not Found ' })
    next();
});
 


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Content-type','application/x-www-form-urlencoded');

    // Pass to next layer of middleware
    next();
});


//define post for deployment prupoes
const PORT = process.env.PORT || 3000
//server start 
app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});



  module.exports = app;