const {Pool} = require ("pg");

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

module.exports ={
    pool
}