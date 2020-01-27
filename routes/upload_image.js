const { Router } = require('express');
const pool = require('../db');
const multer = require('multer')

const router = Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg'  )
    }
})


const MAX_SIZE = 10000000 ; 
var upload = multer({
    //dest:'./uploads/',
   storage:storage ,
    limits: { fileSize: MAX_SIZE }
    


    }  )




router.post("/", upload.single("file"),(req , res )=>{

       

    res.send(req.file.filename);
    //res.send(req.file.filename + "") ; 
   console.log('File Addded') ; 

} ); 




router.use(function (err  , req , res , next ){
if ( err.code === "LIMIT_FILE_TYPES"){
    res.status(422).json({error:"Only Images are allowed"})
}
if(err.code == "LIMIT_FILE_SIZE"){
    res.status(422).json({error:"Too Large Image 1 mb is limit"})
}

return;
})


module.exports = router; 