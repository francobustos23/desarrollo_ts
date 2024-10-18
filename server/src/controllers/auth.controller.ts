import { Request, Response } from "express";
import { User } from "../Models";

export const loginUser = async (req: Request, res: Response): Promise<void> => {

    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                name,
                email,
                password
            }
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.log('error getting the user: ', error);
    }
}


