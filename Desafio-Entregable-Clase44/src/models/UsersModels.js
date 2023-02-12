class User {
    constructor () {
        this.users = []
    }
    addUser (id, name, email, address) {
        const user = {
            id,
            name,
            email,
            address
        }
        this.users.push(user)
        return user
    }
    getAllUsers () {
        return this.users
    }
    getUserById (id) {
        return this.users.find(user => user.id === id)
    }
    updateUser (id, name, email, address) {
        const user = this.users.find(user => user.id === id)
        user.name = name
        user.email = email
        user.address = address
        return user
    }
    deleteUser (id) {
        const user = this.users.find(user => user.id === id)
        this.users = this.users.filter(user => user.id !== id)
        return user
    }   
}

const user = new User()

export default user