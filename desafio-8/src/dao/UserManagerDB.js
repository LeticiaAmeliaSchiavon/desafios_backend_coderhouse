const User = require('./models/user.model');
const bcrypt = require('bcrypt');

class UserManagerDB {
    async createUser(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        return await user.save();
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async findUserById(id) {
        return await User.findById(id);
    }
}

module.exports = UserManagerDB;