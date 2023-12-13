import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "../../../config/axiosConfigCommon";
import {
   HiArrowNarrowDown,
   HiArrowNarrowUp,
   HiOutlineSearch,
   HiPencilAlt,
   HiPlusCircle,
   HiTrash,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import Popup from "../../../components/Popup";
import AddProduct from "../../Product/AddProduct";
import cogoToast from "cogo-toast";
import UpdateProduct from "../../Product/UpdateProduct";

const Product = () => {
   const { _id } = useParams();

   const [products, setProducts] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const [dsPro, setDsPro] = useState([]);
   const [dsProducts, setDsProducts] = useState([]);

   useEffect(() => {
      const filteredProduct = dsPro.filter((item) => item.supplier === _id);
      setDsProducts(filteredProduct);
   }, [products, _id, dsPro]);

   const totalValue = dsProducts.reduce((acc, invoice) => {
      return acc + invoice.quantity * invoice.price;
   }, 0);

   const getAllProduct = useCallback(async () => {
      const res = await axios.get(
         `products?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setProducts(res.data);
      setDsPro(res.data.data);
   }, [page, search, sort.order, sort.sort]);

   useEffect(() => {
      getAllProduct();
   }, [getAllProduct]);

   const loadListProduct = async () => {
      await getAllProduct();
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
   const [productId, setProductId] = useState("");

   const openPopupUpdate = (productId) => {
      setProductId(productId);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   const handleDeleteProduct = async (productId) => {
      try {
         const res = await axios.delete(`products/${productId}`);

         if (res.status === 200) {
            await loadListProduct();
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
               <AddProduct
                  _id={_id}
                  closePopupAdd={closePopupAdd}
                  loadListProduct={loadListProduct}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateProduct
                  productId={productId}
                  closePopupUpdate={closePopupUpdate}
                  loadListProduct={loadListProduct}
               />
            </Popup>
         )}

         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Hàng hóa</strong>
            <div className="flex justify-between items-center">
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
               <div>
                  Tổng giá trị các đơn hàng:{" "}
                  <span className="text-red-500">
                     {totalValue
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>{" "}
                  VNĐ
               </div>
               <button
                  className="text-green-700 text-2xl mr-[80px]"
                  onClick={openPopupAdd}
               >
                  <HiPlusCircle />
               </button>
            </div>

            {products.total > 0 ? (
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
                                 Tên hàng hóa
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
                              <th>Hình ảnh</th>
                              <th>Số lượng</th>
                              <th>Giá</th>
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
                           </tr>
                        </thead>
                        <tbody>
                           {dsProducts &&
                              dsProducts.map((product, index) => (
                                 <tr key={product._id}>
                                    <td>
                                       #
                                       {index + 1 + (page - 1) * products.limit}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>
                                       <img
                                          src={product.photo}
                                          alt=""
                                          className="w-16 h-16 rounded-full"
                                       />
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>
                                       {product.price
                                          .toString()
                                          .replace(
                                             /\B(?=(\d{3})+(?!\d))/g,
                                             "."
                                          )}
                                    </td>
                                    <td>
                                       {format(
                                          new Date(product.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>
                                       <div className="flex items-center gap-5">
                                          <button
                                             className="text-xl text-blue-700"
                                             onClick={() =>
                                                openPopupUpdate(product._id)
                                             }
                                          >
                                             <HiPencilAlt />
                                          </button>

                                          <button
                                             className="text-xl text-red-700"
                                             onClick={() =>
                                                handleDeleteProduct(product._id)
                                             }
                                          >
                                             <HiTrash />
                                          </button>
                                       </div>
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

export default Product;
