const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "passpass",
    host: "localhost",
    port: 5432,
    pernstack: "perntodo",
});

module.exports = pool;