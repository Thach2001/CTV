import Product from "../pages/Product/Product";
import Warehouse from "../pages/Warehouse/Warehouse";
import Products from "../pages/Product";
import Supplier from "../pages/Supplier/Supplier";
import ProductSupplier from "../pages/Supplier/Product/Product";

const publicRoutes = [
   { path: "/warehouses/:_id", component: Product },
   { path: "/warehouses", component: Warehouse },
   { path: "/", component: Products },
   { path: "/suppliers", component: Supplier },
   { path: "/suppliers/:_id", component: ProductSupplier },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
