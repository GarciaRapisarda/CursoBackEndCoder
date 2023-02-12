import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import user from './src/models/UsersModels.js';

const app = express();
app.listen(8080, () => console.log('Server running in 8080 port'));



const schema = buildSchema(`
    type User {
        id: Int
        name: String
        email: String
        address: String
    }
    type Query {
        users: [User]
        getAllUsers: [User]
        getUserById(id: Int): User
    }
    type Mutation {
        addUser(id: Int, name: String, email: String, address: String): User
        updateUser(id: Int, name: String, email: String, address: String): User
        deleteUser(id: Int): User
    }
`);





const root = {
    users: () => {
        return user.getAllUsers()
    },
    addUser: ({ id, name, email, address }) => {
        return user.addUser(id, name, email, address)
    },
    getAllUsers: () => {
        return user.getAllUsers()
    },
    getUserById: ({ id }) => {
        return user.getUserById(id)
    },
    updateUser: ({ id, name, email, address }) => {
        return user.updateUser(id, name, email, address)
    },
    deleteUser: ({ id }) => {
        return user.deleteUser(id)
    }
}

app.use('/', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

