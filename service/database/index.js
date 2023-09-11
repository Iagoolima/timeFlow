const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'timeflow',
    password: '0225',
    port: 5432,
});

module.exports = pool;