import { Model } from "sequelize";
import User from "../Models/User";

type IUser = {
    name: string;
    email: string;
    password: string;
    role: string;
}

class UserService {
    constructor() {}

    async findAllUsers(): Promise<Model<any, any>[]> {
        return await User.findAll();
    }

    async findOneUser(id: string): Promise<Model<any, any> | null> {
        return await User.findByPk(id);
    }

    async createUser(params: IUser) {
        return await User.create(params);
    }

    async updateUser(id: string, params: IUser) {
        return await User.update(params, { where: { id } });
    }

    async deleteUser(id: string) {
        return await User.update({ state: false }, { where: { id } });
    }

}

export default new UserService();