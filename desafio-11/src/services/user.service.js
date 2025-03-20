const UserManagerDB = require('../dao/UserManagerDB');

class UserService {
    constructor() {
        this.userManager = new UserManagerDB();
    }

    async createUser(email, password) {
        return await this.userManager.createUser(email, password);
    }

    async findUserByEmail(email) {
        return await this.userManager.findUserByEmail(email);
    }

    async findUserById(id) {
        return await this.userManager.findUserById(id);
    }
}

module.exports = UserService;