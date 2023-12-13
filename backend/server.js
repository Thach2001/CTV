const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./Services/ConnectDBService");
const productRoute = require("./Routes/ProductRoute");
const warehouseRoute = require("./Routes/WarehouseRoute");
const supplierRoute = require("./Routes/SupplierRoute");

require("dotenv").config();

// middleware apply cors add all request
app.use(cors());
// middleware get info from by req.body
app.use(express.json());

// connect database
connectDB();

app.use("/api/products", productRoute);
app.use("/api/warehouses", warehouseRoute);
app.use("/api/suppliers", supplierRoute);

app.listen(process.env.PORT, function () {
   console.log(`Server listen on port ${process.env.PORT}`);
});
