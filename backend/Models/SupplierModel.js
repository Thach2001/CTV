const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, require: true },
   },
   { timestamps: true }
);

const SupplierModel = mongoose.model("Supplier", SupplierSchema);

module.exports = SupplierModel;
