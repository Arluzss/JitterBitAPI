import { Router } from 'express';
import {authenticateToken as authMiddleware} from '../middlewares/authMiddleware.js';
import OrderController from '../controllers/OrderController.js';

const router = Router();

router.use(authMiddleware);

router.post("/", OrderController.create);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);
router.get("/list", OrderController.list);
router.get("/:id", OrderController.get);

export default router;