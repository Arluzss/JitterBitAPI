const { Router } = require('express');
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder } = require('../controllers/OrderController');
const router = Router();

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/list", getAllOrder);
router.get("/:id", getOrder);

module.exports = router;