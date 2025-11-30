import { Router } from 'express';
import { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder } from '../controllers/OrderController.js';

const router = Router();

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/list", getAllOrder);
router.get("/:id", getOrder);

export default router;