const { Router } = require('express');
const pool = require('../db'); 

const router = Router(); 

router.get('/', (request, response, next) => {

    pool.query('SELECT * FROM storedb ORDER BY store_rank ASC;',
        (err, res) => {

            if (err) {

                // console.log(err);
                return next(err);
            }

            response.json(res.rows);

        });

}); 

router.get('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('SELECT * FROM storedb WHERE  store_id = $1', [id], (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
    });
});


router.get('/search/:querys', (request,response ,next ) =>
{
    const {querys} = request.params ; 
    pool.query('select store_name , store_details   from storedb where searchText @@  plainto_tsquery($1) UNION select  store_name , store_details  from productdb where searchText @@  plainto_tsquery($1)  '
        , [querys], (err, res) =>{

            if (err) return next(err);

            response.json(res.rows); 
            console.log(err)  ; 
         

        } ) ; 




});

router.get('/admin-search/:querys', (request, response, next) => {
    const { querys } = request.params;
    pool.query('select *   from storedb where searchText @@  plainto_tsquery($1) '
        , [querys], (err, res) => {

            if (err) return next(err);

            response.json(res.rows);
            console.log(err);


        });




});


module.exports = router ; 