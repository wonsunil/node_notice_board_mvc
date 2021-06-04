const connection = require("../mysql/connection");
const JARepository = require("./JARepository");

class UserRepository extends JARepository{
    constructor() {
        super();
        this._table = "user_info";
    };

    register = user => this.save(user);
    findUser = async id => await this.findById(id);
    findUsers = async () => await this.findAll();
    findByIdAndPassword = async (id, password) => [...await connection.query(`select * from user_info where id = '${id}' and password = '${password}'`)].shift()[0];
};

module.exports = new UserRepository();