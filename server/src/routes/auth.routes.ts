import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";

const router: Router = Router();

router.post('/auth/login', loginUser);

export default router;