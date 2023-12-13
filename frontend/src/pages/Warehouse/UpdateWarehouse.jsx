import { useEffect, useState } from "react";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const UpdateWarehouse = ({
   warehouseId,
   closePopupUpdate,
   loadListWarehouse,
}) => {
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      inventory_number: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   useEffect(() => {
      const getSingleProduct = async () => {
         try {
            const res = await axios.get(`warehouses/${warehouseId}`);
            setFormData(res.data.data);
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu", { position: "top-right" });
         }
      };
      getSingleProduct();
   }, [warehouseId]);

   const handleUpdateProduct = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.put(`warehouses/${warehouseId}`, formData);

         if (res.status === 200) {
            cogoToast.success("Cập nhật hàng hóa thành công", {
               position: "top-right",
            });
            await loadListWarehouse();
            closePopupUpdate();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <div className="w-[600px] p-4 bg-white rounded shadow-md">
         <h2 className="text-2xl font-bold mb-4 text-center text-primaryColor">
            Cập nhật kho hàng
         </h2>
         <form>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Tên kho hàng:
               </label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập vào tên kho hàng"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
                  Địa chỉ:
               </label>
               <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập vào địa chỉ"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4 flex items-center justify-between">
               <div>
                  <label className="block text-gray-700 font-bold mb-2">
                     Số lượng hàng tồn kho:
                  </label>
                  <input
                     type="number"
                     name="inventory_number"
                     value={formData.inventory_number}
                     onChange={handleInputChange}
                     placeholder="Nhập vào số lượng hàng tồn kho"
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
            </div>
         </form>
         <div className="flex items-center gap-5">
            <button
               type="submit"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
               onClick={handleUpdateProduct}
            >
               Cập nhật kho hàng
            </button>
            <button
               type="submit"
               className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
               onClick={() => closePopupUpdate()}
            >
               Hủy
            </button>
         </div>
      </div>
   );
};

export default UpdateWarehouse;
