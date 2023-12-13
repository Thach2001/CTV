const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      address: { type: String, required: true },
      inventory_number: { type: Number, require: true },
   },
   { timestamps: true }
);

const WarehouseModel = mongoose.model("Warehouse", WarehouseSchema);

module.exports = WarehouseModel;
