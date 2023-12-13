import { useState } from "react";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const AddProduct = ({ closePopupAdd, loadListProduct, _id }) => {
   const [formData, setFormData] = useState({
      supplier: _id,
      name: "",
      photo: "",
      quantity: "",
      price: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleAddUser = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post("products", formData);

         if (res.status === 200) {
            cogoToast.success("Thêm hàng hóa thành công", {
               position: "top-right",
            });
            await loadListProduct();
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
            Thêm hàng hóa
         </h2>
         <form>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Tên hàng hóa:
               </label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập vào tên hàng hóa"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
                  Hình ảnh:
               </label>
               <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  placeholder="Nhập vào đường dẫn hình ảnh"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>

            <div className="mb-4 flex items-center justify-between">
               <div>
                  <label
                     htmlFor="password"
                     className="block text-gray-700 font-bold mb-2"
                  >
                     Số lượng:
                  </label>
                  <input
                     type="number"
                     name="quantity"
                     value={formData.quantity}
                     onChange={handleInputChange}
                     placeholder="Nhập vào số lượng"
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
               <div>
                  <label className="block text-gray-700 font-bold mb-2">
                     Giá:
                  </label>
                  <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleInputChange}
                     placeholder="Nhập vào giá"
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
            </div>
         </form>
         <div className="flex items-center gap-5">
            <button
               type="submit"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
               onClick={handleAddUser}
            >
               Thêm hàng hóa
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

export default AddProduct;
