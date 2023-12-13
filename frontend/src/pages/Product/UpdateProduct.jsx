import { useEffect, useState } from "react";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const UpdateProduct = ({ productId, closePopupUpdate, loadListProduct }) => {
   const [formData, setFormData] = useState({
      warehouse: "",
      name: "",
      photo: "",
      quantity: "",
      price: "",
   });

   const [selectedWarehouse, setSelectedWarehouse] = useState("");

   const handleInputChange = (e) => {
      const { name, value } = e.target;

      // Xử lý riêng trường warehouse
      if (name === "warehouse") {
         const selectedWarehouse = warehouses.find(
            (warehouse) => warehouse._id === value
         );

         // Kiểm tra xem selectedWarehouse có tồn tại không
         if (selectedWarehouse) {
            setFormData({
               ...formData,
               warehouse: selectedWarehouse._id,
            });
            setSelectedWarehouse(value); // Cập nhật selectedWarehouse để đảm bảo hiển thị đúng trong dropdown
         } else {
            // Xử lý khi không tìm thấy kho
            setFormData({
               ...formData,
               warehouse: "", // Hoặc giá trị mặc định khác nếu cần
            });
            setSelectedWarehouse(""); // Đặt giá trị selectedWarehouse về trống
         }
      } else {
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   useEffect(() => {
      const getSingleProduct = async () => {
         try {
            const res = await axios.get(`products/${productId}`);
            setFormData(res.data.data);
            setSelectedWarehouse(res.data.data.warehouse?._id || ""); // Set giá trị mặc định cho selectedWarehouse
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu", { position: "top-right" });
         }
      };
      getSingleProduct();
   }, [productId]);

   const handleUpdateProduct = async (e) => {
      e.preventDefault();

      try {
         // Cập nhật warehouse._id từ selectedWarehouse vào formData
         setFormData({
            ...formData,
            warehouse: selectedWarehouse,
         });

         const res = await axios.put(`products/${productId}`, formData);

         if (res.status === 200) {
            cogoToast.success("Cập nhật hàng hóa thành công", {
               position: "top-right",
            });
            await loadListProduct();
            closePopupUpdate();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   const [warehouses, setWarehouses] = useState([]);

   useEffect(() => {
      const getAllWarehouse = async () => {
         try {
            const res = await axios.get("warehouses");
            setWarehouses(res.data.data);
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu kho hàng", {
               position: "top-right",
            });
         }
      };
      getAllWarehouse();
   }, []);

   return (
      <div className="w-[600px] p-4 bg-white rounded shadow-md">
         <h2 className="text-2xl font-bold mb-4 text-center text-primaryColor">
            Cập nhật hàng hóa
         </h2>
         <form>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
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
                  Kho hàng:
               </label>
               <select
                  name="warehouse"
                  value={selectedWarehouse}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
               >
                  <option value="" disabled>
                     Chọn kho hàng
                  </option>
                  {warehouses.map((warehouse) => (
                     <option key={warehouse._id} value={warehouse._id}>
                        {warehouse.name}
                     </option>
                  ))}
               </select>
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
               onClick={handleUpdateProduct}
            >
               Cập nhật hàng hóa
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

export default UpdateProduct;
