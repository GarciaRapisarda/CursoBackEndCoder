class UserDto {
    constructor({ _id, name, email}) {
        this.id = _id;
        this.name = name;
        this.email = email;
    }
}

module.exports = {
    UserDto
};
