const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessage } = require("../controllers/messageControllers");
const { allMessages, messages } = require("../controllers/messageControllers");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);
router.route("/deleteall").delete(protect, messages);

module.exports = router;
