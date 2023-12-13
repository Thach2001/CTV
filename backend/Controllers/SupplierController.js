const Supplier = require("../Models/SupplierModel");

const getAllSupplier = async (req, res) => {
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

      const suppliers = await Supplier.find({
         name: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Supplier.countDocuments({
         name: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: suppliers,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const createSupplier = async (req, res) => {
   try {
      const supplier = new Supplier(req.body);

      await supplier.save();

      res.status(200).json({ supplier });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateSupplier = async (req, res) => {
   const id = req.params.id;

   try {
      const updateSupplier = await Supplier.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateSupplier,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteSupplier = async (req, res) => {
   const id = req.params.id;

   try {
      await Supplier.findByIdAndDelete(id);

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

const getSingleSupplier = async (req, res) => {
   const id = req.params.id;

   try {
      const supplier = await Supplier.findById(id);

      res.status(200).json({
         success: true,
         message: "Supplier found",
         data: supplier,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No supplier found",
      });
   }
};

module.exports = {
   getAllSupplier,
   createSupplier,
   updateSupplier,
   deleteSupplier,
   getSingleSupplier,
};
