import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from "../controllers/user.controllers";

const router: Router = Router();

router.get('/users', getUsers);
router.get('/:id', getUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;