const {Pool} = require('pg') ; 
const {user , host , database , password , port ,ssl} = require('../secrets/db_configaration');


const pool = new Pool({
    user , host , database , password ,port ,ssl})



// exporting the pool so i can use it other 
module.exports = pool  ; 