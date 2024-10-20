import { Router } from "express";
import { getAllCategories} from "../controllers/category.controller";

const router: Router = Router();

router.get('/all/categories', getAllCategories);

export default router;