const express = require("express");
const router = express.Router();
const {authMiddleware , adminAuth} = require("../middleware/authentication")

const {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orders");

router.get("/" , authMiddleware , adminAuth, getAllOrders)
router.post("/" , createOrder);
router.get("/:id" , authMiddleware , adminAuth , getSingleOrder);
router.patch("/:id" , authMiddleware , adminAuth , updateOrder);
router.delete("/:id" , authMiddleware , adminAuth , deleteOrder);

module.exports = router;