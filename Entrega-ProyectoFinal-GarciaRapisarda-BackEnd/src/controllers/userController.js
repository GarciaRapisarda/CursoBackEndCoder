const UserModel = require("../models/UserModel");

class UserController {
    async getAllUsers(req, res) {
        try {
            let result = await UserModel.find();
            return res.status(200).send({ status: "OK", result });
        } catch (error) {
            return { status: "ERROR", result: error.message };
        }
    }

    async getUserById(req, res) {
        try {
            let result = await UserModel.findById(req.params.id);
            return res.status(200).send({ status: "OK", result });
        } catch (error) {
            return res.status(400).send({ status: "ERROR", result: error.message });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            return res.status(200).send({ status: "OK", result: email });
        } catch (error) {
            return res.status(400).send({ status: "ERROR", result: error.message });
        }
    }

    async createUser(req, res) {
        try {
            let result = await UserModel.create(req.body);
            return res.status(200).send({ status: "OK", result });
        } catch (error) {
            return res.status(400).send({ status: "ERROR", result: error.message });
        }
    }   

    async updateUser(req, res) {
        try {
            let {id} = req.params;
            try {
                let user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
                return res.status(200).send({ status: "OK", result: user });
            } catch (error) {
                return res.status(400).send({ status: "ERROR", result: error.message });
            }
        } catch (error) {
            return res.status(400).send({ status: "ERROR", result: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            let result = await UserModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({ status: "OK", result });
        } catch (error) {
            return res.status(400).send({ status: "ERROR", result: error.message });
        }
    }

}

module.exports = new UserController();