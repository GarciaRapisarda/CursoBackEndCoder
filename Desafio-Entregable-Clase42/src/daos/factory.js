import config from "../config/config.js";  

export default class FactoryDAO {
    static getPersistence = async () => {
        switch (config.app.persistencia) {
            case 'fs':
                const { default: UserDaoFileSys } = await import('./userDaoFileSys.js');
                return new UserDaoFileSys();
            case 'mongo':
                const { default: ProductDaoMongoDb } = await import('./productDaoMongoDb.js');
                return new ProductDaoMongoDb();
            case 'array':
                const { default: UserDaoArrays } = await import('./userDaoArrays.js');
                return new UserDaoArrays();
        }
    }
}
