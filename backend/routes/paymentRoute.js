const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/paymentController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/checkout_session/:orderId").post(processPayment);
// router.route("/payment/process").post(isAuthenticatedUser, processPayment);

// router.route("/stripeapiKey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
