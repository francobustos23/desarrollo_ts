import { Router } from "express";
import userRoutes from './user.routes';
import movementRoutes from './movement.routes'
import authRoutes from './auth.routes';

const router: Router = Router();

router.use(userRoutes);
router.use(movementRoutes);
router.use(authRoutes);

export { router };