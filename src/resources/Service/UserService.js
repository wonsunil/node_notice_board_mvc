const userRepository = require("../Repository/UserRepository");

class UserService{
    select = async id => await userRepository.findById(id);
    selectAll = async () => await userRepository.findAll();

    login = async (id, password) => await userRepository.findByIdAndPassword(id, password);
};

module.exports = new UserService();