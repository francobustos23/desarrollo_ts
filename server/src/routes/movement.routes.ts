import { Router } from "express";
import { 
    createMovement,
    deleteMovement,
    getMovement,
    getMovements
} from "../controllers/movement.controllers";

const router: Router = Router();

router.get('/all/movements', getMovements);
router.get('/movement/:id', getMovement);
router.post('/movement', createMovement);
router.delete('/movement/:id', deleteMovement);

export default router; 