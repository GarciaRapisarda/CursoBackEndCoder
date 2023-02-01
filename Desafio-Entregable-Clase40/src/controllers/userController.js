import UserServices from '../services/userService.js';
import userDto from '../dtos/userDto.js';
const userServices = new UserServices();

const getAll = async (req, res) => {
    const users = await userServices.getAll();
    res.json(users);
};

const create = async (req, res) => {
    const user = await userServices.create(req.body);
    res.json(user);
};

export default {
    getAll,
    create
};
