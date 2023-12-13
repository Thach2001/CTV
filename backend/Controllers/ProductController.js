const Product = require("../Models/ProductModel");

const getAllProduct = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 8;
   const search = req.query.search || "";

   try {
      let sort = req.query.sort || "createdAt";

      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
         sortBy[sort[0]] = sort[1];
      } else {
         sortBy[sort[0]] = "desc";
      }

      const products = await Product.find({
         name: { $regex: search, $options: "i" },
      })
         .populate("warehouse")
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Product.countDocuments({
         name: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: products,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const createProduct = async (req, res) => {
   try {
      const product = new Product(req.body);

      await product.save();

      res.status(200).json({ product });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateProduct = async (req, res) => {
   const id = req.params.id;

   try {
      const updateProduct = await Product.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateProduct,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteProduct = async (req, res) => {
   const id = req.params.id;

   try {
      await Product.findByIdAndDelete(id);

      res.status(200).json({
         success: true,
         message: "Successfully deleted",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to delete",
      });
   }
};

const getSingleProduct = async (req, res) => {
   const id = req.params.id;

   try {
      const product = await Product.findById(id);

      res.status(200).json({
         success: true,
         message: "Product found",
         data: product,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No product found",
      });
   }
};

module.exports = {
   getAllProduct,
   createProduct,
   updateProduct,
   deleteProduct,
   getSingleProduct,
};
