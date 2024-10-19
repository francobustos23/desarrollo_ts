import { Router } from "express";
import userRoutes from './user.routes';
import movementRoutes from './movement.routes'
import equipmentRoutes from './equipment.routes';
import authRoutes from './auth.routes';

const router: Router = Router();

router.use(userRoutes);
router.use(movementRoutes);
router.use(authRoutes);
router.use(equipmentRoutes);

export { router };