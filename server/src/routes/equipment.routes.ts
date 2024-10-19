import { Router } from "express";
import { createEquipment, getEquipments } from "../controllers/equipment.controller";


const router: Router = Router();

router.get('/all/equipments', getEquipments);
router.post('/equipment', createEquipment);

export default router;