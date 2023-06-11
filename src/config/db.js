const { Pool } = require ('pg')
 
const pool = new Pool({
  user: "ravic",
  host: "localhost",
  database: "cinema",
  password: "baledodokan"
})

module.exports = pool