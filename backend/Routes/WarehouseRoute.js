const express = require("express");
const router = express.Router();
const warehouseController = require("../Controllers/WarehouseController");

router.get("/", warehouseController.getAllWarehouse);
router.post("/", warehouseController.createWarehouse);
router.get("/:id", warehouseController.getSingleWarehouse);
router.put("/:id", warehouseController.updateWarehouse);
router.delete("/:id", warehouseController.deleteWarehouse);

module.exports = router;
