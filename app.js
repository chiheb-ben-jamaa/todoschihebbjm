//init The modules:
const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//create express app:
const app=express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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
    console.log("Testing the API !")
    return res.send({ error: true, message: 'Router not Found ' })
    next();
});
 


//define post for deployment prupoes
const PORT = process.env.PORT || 3000
//server start 
app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});



  module.exports = app;