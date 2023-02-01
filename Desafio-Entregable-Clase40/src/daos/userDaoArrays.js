export default class UserDaoArrays {
    constructor() {
        this.users = [];
    }

    async getAll() {
        return this.users;
    }
    async create(user) {
        if (this.users.length === 0) user.id = 1;
        else user.id = this.users[this.users.length - 1].id + 1;
        this.users.push(user);
        return user;
    }
}
