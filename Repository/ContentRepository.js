const connection = require("../mysql/connection");
const JARepository = require("./JARepository");

class ContentRepository extends JARepository{
    constructor() {
        super();
        this._table = "content_info";
    };

    write = content => this.save(content);
    findContent  = async id => await this.findById(id);
    findNextId = async () => [...await connection.query(`select id from content_info order by id desc limit 1;`)].shift()[0];
    findPrevContent = async id => [...await connection.query(`select * from content_info where id < '${id}' order by id desc limit 1`)].shift()[0];
    findNextContent = async id => [...await connection.query(`select * from content_info where id > '${id}' order by id asc limit 1`)].shift()[0];
    findContents = async () => await this.findAll();
};

module.exports = new ContentRepository();