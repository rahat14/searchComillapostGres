const express = require('express') ; 
const bodyParser=require('body-parser') ; 
const allstoresfun = require('./routes/allstores') ; 
const createStore = require('./routes/createstores'); 
const uploadApp = require('./routes/upload_image') ; 
var cors = require('cors')


const app = express() ; 
app.use(cors())

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()); 

app.use('/allstores', allstoresfun); 
app.use('/createstore', createStore ) ; 
app.use('/upload' , uploadApp) ; 




// for the single store data



// catching error 
app.use((err, req, res, next) => {

   
    //res.sendStatus(500);
   res.json(err)


}); 


module.exports = app  ; 
