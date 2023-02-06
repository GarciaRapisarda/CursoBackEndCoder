//import UserDaoArrays from "../daos/userDaoArrays";
//import UserDaoFileSys from "../daos/userDaoFileSys";
import FactoryDAO from "../daos/factory.js";

export default class UserService {
    constructor() {
        // this.userDao = new UserDaoArrays();
        // this.userDao = new UserDaoFileSys();
        this.userDao
        this.init();
    }

    async init() {
        this.userDao = await FactoryDAO.getPersistence();
    }

    async getAll() {
        return await this.userDao.getAll();
    }

    async create(user) {
        return await this.userDao.create(user);
    }
}





