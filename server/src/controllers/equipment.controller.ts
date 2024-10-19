import { Request, Response } from "express";
import EquipmentService from '../services/Equipment'
// import { Equipment } from "../Models";

export const getEquipments = async (req: Request, res: Response) => {
    try {
        const equipments = await EquipmentService.findAllEquipments();
        res.status(200).json(equipments)
    } catch (error) {
        console.log('Error getting equipments', error)
    }
}

export const createEquipment = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const equipment = await EquipmentService.createEquipment(body);
        res.status(200).json(equipment);
    } catch (error) {
        console.log('error creating movement: ', error);
    }   
}
