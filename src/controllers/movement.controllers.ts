import { Request, Response } from "express";
import MovementsService from "../services/Movements";
import Movement from '../Models/Movements';


export const getMovements = async (req: Request, res: Response) => {
    try {
        const movements = await MovementsService.findAllMovements();
        res.status(200).json(movements);
    } catch (error) {
        console.log('error getting movements', error);
    }
};

export const getMovement = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movement = await MovementsService.findOneMovement(id);
        if (!movement) {
            res.status(404).json({ message: 'Movement not found' });
        }
        res.status(200).json(movement);
    } catch (error) {
        console.log('error getting the movement: ', error);
    }
};

export const createMovement = async (req: Request, res: Response) => {
    console.log('cuerpo de la solicitud: ', req.body);
    const { body } = req;
    try {
        //Si hay errores usar:  Movement.create(body)
        const movement = await MovementsService.createMovement(body);
        res.status(201).json(movement);
    } catch (error) {
        console.log('error creating movement: ', error);
    }
};

export const deleteMovement = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movement = await MovementsService.findOneMovement(id);
        if (!movement) {
            res.status(404).json({ message: 'Movement not found' });
        }
        await MovementsService.deleteMovement(id);
        res.status(200).json(movement);
    } catch (error) {
        console.log('error deleting movement: ', error);
    }
};