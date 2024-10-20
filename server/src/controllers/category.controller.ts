import { Request, Response } from "express";
import CategoryServices from "../services/Category";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryServices.findAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.log('Error getting categories: ', error)
    }
}
