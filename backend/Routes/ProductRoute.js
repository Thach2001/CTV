const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");

router.get("/", productController.getAllProduct);
router.post("/", productController.createProduct);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
