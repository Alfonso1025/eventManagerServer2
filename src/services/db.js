const Pool = require('pg').Pool
const pool= new Pool({
    user:'postgres',
    password:'2004',
    database:'events_guests',
    host:'localhost',
    port:5432
})

module.exports=pool