import { Equipment } from "../Models";

type IEquipment = {
    name: string;
    categoryId: string,
    stock: number,
}

class EquipmentService {

    constructor() { }

    async findAllEquipments() {
        return await Equipment.findAll();
    }

    async findOneEquipment(id: string) {
        return await Equipment.findByPk(id);
    }

    async createEquipment(params: IEquipment) {
        return await Equipment.create(params);
    }

    async updateEquipment(id: string, params: IEquipment) {
        return await Equipment.update(params, { where: { id } });
    }

    async deleteEquipment(id: string) {
        return await Equipment.update({ state: false }, { where: { id } });
    }
}

export default new EquipmentService();