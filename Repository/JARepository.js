const connection = require("../mysql/connection");

module.exports = class JARepository{
    save = function(content) { connection.query(`insert into ${this._table}(${Object.keys(content).map(key => key.replace("_", " ")).toString()}) values(${Object.values(content).map(value => `'${value}'`).toString()})`) };
    findById = async function(id) { return [...await connection.query(`select * from ${this._table} where id = '${id}'`)].shift()[0] };
    findAll = async function() { return [...await connection.query(`select * from ${this._table}`)].shift() };
};