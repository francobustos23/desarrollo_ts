import { Router } from "express";
import userRoutes from './user.routes';
import equipmentRoutes from './equipment.routes';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes'

const router: Router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(equipmentRoutes);
router.use(categoryRoutes);

export { router };