import { Request, Response } from 'express';
import UserService from '../services/User';
import User from '../Models/User';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.findAllUsers();
    res.status(200).json(users);
  } catch (error:any) {
    console.log('error getting users: ', error);
}
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await UserService.findOneUser(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error:any) {
        console.log('error getting the user: ', error);
    }
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const {body} = req;
    try {
        const existEmail = await User.findOne({ 
            where: {
                email: body.email 
        }});

        if (existEmail) {
           return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await UserService.createUser(body);
        res.status(201).json(user);
    } catch (error:any) {
        console.log('error creating user: ', error);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const {body} = req;
    try {
        const user = await UserService.findOneUser(id);
        if (!user) {
           return res.status(404).json({ message: 'User not found' });
        }
        await UserService.updateUser(id, body);
        res.status(200).json(user);
    } catch (error:any) {
        console.log('error update user: ', error);
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const user = await UserService.findOneUser(id);
        if (!user) {
           return res.status(404).json({ message: 'User not found' });
        }
        await UserService.deleteUser(id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error:any) {
        console.log('error deleting user: ', error);
    }
}