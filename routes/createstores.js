const { Router } = require('express');
const pool = require('../db');

const router = Router(); 



router.post('/' , (request , response , next) =>{

const {  shop_Name,shop_Details,shop_ph,shop_Adress,shop_Tag,shop_loc_Category,shop_lat,shop_long,shop_image,shop_OpenTime  } = request.body ; 
   
    pool.query('INSERT INTO storedb (store_name , store_details , store_ph , store_adress , store_rating , store_tag , store_loc_category , store_lat, store_long, store_image, store_open_time , store_rank) VALUES($1, $2, $3, $4, $5, $6 , $7 , $8 , $9 , $10, $11 ,$12)'

        , [shop_Name, shop_Details, shop_ph, shop_Adress,'0.0', shop_Tag,shop_loc_Category,shop_lat,shop_long,shop_image,shop_OpenTime, 100]
        , (err , res)=>{
            if(err) 
            {
                console.log(err) ; 
                console.log(request.body) ; 
                return next(err); 
            }
            
            console.log("enterd the store") ; 
            response.send("DONE") ; 
          
            
        }
    ); 



}) ; 

module.exports = router; 