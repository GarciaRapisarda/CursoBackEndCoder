import config from "../config/config.js";  

export default class FactoryDAO {
    static getPersistence = async () => {
        switch (config.app.persistencia) {
            case 'fs':
                const { default: UserDaoFileSys } = await import('./userDaoFileSys.js');
                return new UserDaoFileSys();
            case 'mongo':
                const { default: UserDaoMongoDb } = await import('./userDaoMongoDb.js');
                return new UserDaoMongoDb();
            case 'array':
                const { default: UserDaoArrays } = await import('./userDaoArrays.js');
                return new UserDaoArrays();
        }
    }
}
