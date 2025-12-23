import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, X } from "lucide-react";
import { Pagination } from "../../UI/Pagination";
import { deleteProduct, findProducts } from '../State/Admin_Products/Action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.adminProducts);



  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products?.slice(startIndex, startIndex + itemsPerPage);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        toast.success('Product deleted successfully!');
        dispatch(findProducts()); // Refetch the products list
      })
      .catch(error => {
        toast.error('Failed to delete product. Please try again.');
      });
  };

  const handleProductEdit = (productId) => {
    navigate(`${productId}`); 
  };

  return (
    <div className="p-4 ">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600 text-sm sm:text-base">Welcome back! Here's what's happening with your business today.</p>
      </div>
      {/* Table Wrapper */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 mt-5">

        <AnimatePresence>
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex bg-white justify-between p-2 border border-gray-200 hover:shadow-2xl rounded-xl transition ease-in duration-300"
            >

              <div className="flex gap-3">
                <div className="w-25 h-25 rounded-xl overflow-hidden bg-gray-50">
                  <img src={product.images[0]} alt={product.title} className=" rounded-xl object-contain" />
                </div>

                <div className="">
                  <p className="text-lg text-gray-800 font-semibold ">{product.title}</p>
                  <p className="text-gray-600">{product.brand}</p>
                  <span className="text-sm text-emerald-800 font-semibold ">{product.category}</span>
                  <p className=" font-semibold text-emerald-800 text-lg"> ₹{product.discountedPrice} </p>
                </div>
              </div>
              <div className="bg-yellow-50  text-center flex flex-col items-start gap-3">
                <button onClick={() => handleProductEdit(product._id)}
                  
                  className="bg-emerald-800/10 border border-emerald-800/20 text-emerald-800  w-10 h-10 rounded-xl flex items-center justify-center"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleProductDelete(product._id)}
                  className="bg-red-600/10 border border-red-600/20 text-red-600  w-10 h-10 rounded-xl flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      {/* Pagination */}
      <Pagination current={currentPage} total={totalPages} onPageChange={setCurrentPage} />

    </div>
  );
};

export default AdminProducts;
