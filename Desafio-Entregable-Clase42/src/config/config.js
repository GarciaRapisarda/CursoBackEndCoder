import dotenv from "dotenv";
dotenv.config();

export default {
    app : {
        persistencia : process.env.PERSISTENCIA || 'fs',
    }

}