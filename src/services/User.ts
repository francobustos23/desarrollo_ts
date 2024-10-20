import { Model } from "sequelize";
import User from "../Models/User";

interface IUser {
    name: string;
    email: string;
    password: string;
}

class UserService {
    constructor() {}

    async findAllUsers(): Promise<Model<any, any>[]> {
        return await User.findAll();
    }

    async findOneUser(id: number): Promise<Model<any, any> | null> {
        return await User.findByPk(id);
    }

    async createUser(params: IUser) {
        return await User.create({name: params.name, email: params.email, password: params.password});
    }

    async updateUser(id: number, params: IUser) {
        return await User.update(params, { where: { id } });
    }

    async deleteUser(id: number) {
        return await User.update({ state: false }, { where: { id } });
    }

}

export default new UserService();