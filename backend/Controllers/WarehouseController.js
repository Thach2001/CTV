const Warehouse = require("../Models/WarehouseModel");

const getAllWarehouse = async (req, res) => {
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

      const warehouses = await Warehouse.find({
         name: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Warehouse.countDocuments({
         name: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: warehouses,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const createWarehouse = async (req, res) => {
   try {
      const warehouse = new Warehouse(req.body);

      await warehouse.save();

      res.status(200).json({ warehouse });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateWarehouse = async (req, res) => {
   const id = req.params.id;

   try {
      const updateWarehouse = await Warehouse.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateWarehouse,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteWarehouse = async (req, res) => {
   const id = req.params.id;

   try {
      await Warehouse.findByIdAndDelete(id);

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

const getSingleWarehouse = async (req, res) => {
   const id = req.params.id;

   try {
      const warehouse = await Warehouse.findById(id);

      res.status(200).json({
         success: true,
         message: "Warehouse found",
         data: warehouse,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No warehouse found",
      });
   }
};

module.exports = {
   getAllWarehouse,
   createWarehouse,
   updateWarehouse,
   deleteWarehouse,
   getSingleWarehouse,
};
