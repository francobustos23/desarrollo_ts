import Movement from '../Models/Movements';

type IMovement = {
    userId: string;
    equipmentId: string;
    type: string;
    description: string;
}

class MovementService {
    constructor() {};

    async findAllMovements() {
        return await Movement.findAll();
    };

    async findOneMovement(id: string) {
        return await Movement.findByPk(id);
    };

    async createMovement(params: IMovement) {
        return await Movement.create(params);
    };

    async deleteMovement(id: string) {
        return await Movement.update({state: false}, {where: {id}});
    };

};

export default new MovementService();