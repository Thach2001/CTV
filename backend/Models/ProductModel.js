const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      warehouse: {
         type: mongoose.Types.ObjectId,
         ref: "Warehouse",
      },
      supplier: {
         type: mongoose.Types.ObjectId,
         ref: "Supplier",
      },
      photo: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, require: true },
   },
   { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
