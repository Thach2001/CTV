import { useState } from "react";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const AddWarehouse = ({ closePopupAdd, loadListWarehouse }) => {
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      phone: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleAddWarehouse = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post("suppliers", formData);

         if (res.status === 200) {
            cogoToast.success("Thêm nhà cung cấp thành công", {
               position: "top-right",
            });
            await loadListWarehouse();
            closePopupAdd();
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
            Thêm nhà cung cấp
         </h2>
         <form>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Tên nhà cung cấp:
               </label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập vào tên nhà cung cấp"
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
                  <label
                     htmlFor="password"
                     className="block text-gray-700 font-bold mb-2"
                  >
                     Số điện thoại:
                  </label>
                  <input
                     type="text"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     placeholder="Nhập vào số điện thoại"
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
            </div>
         </form>
         <div className="flex items-center gap-5">
            <button
               type="submit"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
               onClick={handleAddWarehouse}
            >
               Thêm nhà cung cấp
            </button>
            <button
               type="submit"
               className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
               onClick={() => closePopupAdd()}
            >
               Hủy
            </button>
         </div>
      </div>
   );
};

export default AddWarehouse;
