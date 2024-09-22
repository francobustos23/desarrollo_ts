import { Router } from "express";
import userRoutes from './user.routes';
import movementRoutes from './movement.routes'

const router: Router = Router();

router.use(userRoutes);
router.use(movementRoutes);

export { router };