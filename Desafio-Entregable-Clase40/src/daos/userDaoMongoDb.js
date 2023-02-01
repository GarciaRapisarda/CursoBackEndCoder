import User from './userModel.js';

export default class UserDaoMongoDb {
    constructor() {
        this.users = [];
    }
    
    async getAll() {
        return await User.find();
    }
    async create(user) {
        return await User.create(user);
    }
}

