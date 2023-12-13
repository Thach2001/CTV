import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "../../config/axiosConfigCommon";
import {
   HiArrowNarrowDown,
   HiArrowNarrowUp,
   HiOutlineSearch,
   HiPencilAlt,
   HiPlusCircle,
   HiTrash,
} from "react-icons/hi";
import Popup from "../../components/Popup";
import cogoToast from "cogo-toast";
import UpdateWarehouse from "./UpdateWarehouse";
import AddWarehouse from "./AddWarehouse";

const Warehouses = () => {
   const [warehouses, setWarehouses] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "asc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const getAllWarehouse = useCallback(async () => {
      const res = await axios.get(
         `warehouses?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setWarehouses(res.data);
   }, [page, search, sort.order, sort.sort]);

   useEffect(() => {
      getAllWarehouse();
   }, [getAllWarehouse]);

   const loadListWarehouse = async () => {
      await getAllWarehouse();
   };

   // Sắp xếp
   const handleSort = (column) => {
      if (sort.sort === column) {
         const newOrder = sort.order === "asc" ? "desc" : "asc";
         const newSort = { sort: column, order: newOrder };
         setSort(newSort);
      } else {
         const newSort = { sort: column, order: "desc" };
         setSort(newSort);
      }
      setPage(1);
   };

   // Thêm tài khoản
   const [isPopupOpenAdd, setIsPopupOpenAdd] = useState(false);

   const openPopupAdd = () => {
      setIsPopupOpenAdd(true);
   };

   const closePopupAdd = () => {
      setIsPopupOpenAdd(false);
   };

   // Cập nhật tài khoản
   const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
   const [warehouseId, setWarehouseId] = useState("");

   const openPopupUpdate = (warehouseId) => {
      setWarehouseId(warehouseId);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   const handleDeleteWarehouse = async (warehouseId) => {
      try {
         const res = await axios.delete(`warehouses/${warehouseId}`);

         if (res.status === 200) {
            await loadListWarehouse();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <>
         {isPopupOpenAdd && (
            <Popup isOpen={isPopupOpenAdd} onClose={closePopupAdd}>
               <AddWarehouse
                  closePopupAdd={closePopupAdd}
                  loadListWarehouse={loadListWarehouse}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateWarehouse
                  warehouseId={warehouseId}
                  closePopupUpdate={closePopupUpdate}
                  loadListWarehouse={loadListWarehouse}
               />
            </Popup>
         )}

         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Kho hàng</strong>
            <div className="flex justify-between">
               <div className="relative my-3">
                  <HiOutlineSearch
                     fontSize={20}
                     className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <input
                     type="search"
                     placeholder="Tìm kiếm..."
                     className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[18rem] h-10 pl-11 pr-4 rounded-md"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <button
                  className="text-green-700 text-2xl mr-[80px]"
                  onClick={openPopupAdd}
               >
                  <HiPlusCircle />
               </button>
            </div>

            {warehouses.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("email")}
                              >
                                 Tên kho hàng
                                 {sort.sort === "email" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Địa chỉ</th>
                              <th>Hàng tồn kho</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("createdAt")}
                              >
                                 Ngày tạo
                                 {sort.sort === "createdAt" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Xử lý</th>
                              <th>Chi tiết kho</th>
                           </tr>
                        </thead>
                        <tbody>
                           {warehouses.data &&
                              warehouses.data.map((warehouse, index) => (
                                 <tr key={warehouse._id}>
                                    <td>
                                       #
                                       {index +
                                          1 +
                                          (page - 1) * warehouses.limit}
                                    </td>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.address}</td>
                                    <td>{warehouse.inventory_number}</td>
                                    <td>
                                       {format(
                                          new Date(warehouse.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>
                                       <div className="flex items-center gap-5">
                                          <button
                                             className="text-xl text-blue-700"
                                             onClick={() =>
                                                openPopupUpdate(warehouse._id)
                                             }
                                          >
                                             <HiPencilAlt />
                                          </button>

                                          <button
                                             className="text-xl text-red-700"
                                             onClick={() =>
                                                handleDeleteWarehouse(
                                                   warehouse._id
                                                )
                                             }
                                          >
                                             <HiTrash />
                                          </button>
                                       </div>
                                    </td>
                                    <td className="underline text-primaryColor font-medium cursor-pointer">
                                       <Link to={`${warehouse._id}`}>
                                          Xem chi tiết
                                       </Link>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               </>
            ) : (
               <p className="px-10 py-5">Không có kết quả tìm kiếm</p>
            )}
         </div>
      </>
   );
};

export default Warehouses;
