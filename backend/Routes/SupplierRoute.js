const express = require("express");
const router = express.Router();
const supplierController = require("../Controllers/SupplierController");

router.get("/", supplierController.getAllSupplier);
router.post("/", supplierController.createSupplier);
router.get("/:id", supplierController.getSingleSupplier);
router.put("/:id", supplierController.updateSupplier);
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
