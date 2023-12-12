const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");

router.get("/", contactController.getAllContact);
router.post("/create", contactController.createContact);

module.exports = router;
