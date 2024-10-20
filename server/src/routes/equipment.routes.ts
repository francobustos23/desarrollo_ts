import { Router } from "express";
import { createEquipment, getEquipments, updateEquipment } from "../controllers/equipment.controller";


const router: Router = Router();

router.get('/all/equipments', getEquipments);
router.post('/equipment', createEquipment);
router.put('/equipment/:id', updateEquipment)

export default router;