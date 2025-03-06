const express = require("express");
const { auth, roleMiddleware } = require("../middlewares/authMiddleware");
const { getPayments, getPaymentById, createPayment, updatePayment, deletePayment } = require("../controllers/paymentController");

const router = express.Router();

router.get("/payments", auth, roleMiddleware("admin", "receptionist"), getPayments);
router.post("/new-payment", auth, roleMiddleware("admin", "receptionist"), createPayment);
router.get("/payment/:id", auth, roleMiddleware("admin", "receptionist"), getPaymentById);
router.patch("/payment/:id", auth, roleMiddleware("admin", "receptionist"), updatePayment);
router.delete("/payment/:id", auth, roleMiddleware("admin", "receptionist"), deletePayment);

module.exports = router;
