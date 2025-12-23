import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/Products/Action';
import { useNavigate } from 'react-router-dom';
import {X} from 'lucide-react'
const ProductNotification = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products);

  const [popupProduct, setPopupProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!products?.length) {
      dispatch(findProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (!products?.length) return;

    const showRandomPopup = () => {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];
      setPopupProduct(randomProduct);
      setShowPopup(true);

      // Hide after 5 seconds
      setTimeout(() => setShowPopup(false), 6000);
    };

    // First popup after 10 sec, then every 30 sec
    const firstTimeout = setTimeout(showRandomPopup, 6000);
    const interval = setInterval(showRandomPopup, 30000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [products]);

  if (!popupProduct) return null;

  return (
    <>
      <div  className={`fixed bottom-8 left-8 z-[9999] transition-all duration-500 ease-in-out ${
          showPopup ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none' }`} >
        <div className="flex items-center gap-2 backdrop-blur-lg bg-white/90 border border-gray-200 rounded-2xl shadow-2xl p-3 w-[300px] relative cursor-pointer hover:shadow-3xl transition-all duration-300">
          
          {/* Close button (left side) */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute cursor-pointer right-2 top-2 text-gray-800 hover:text-gray-800 text-lg transition"
          >
            <X className='w-5 h-5' />
          </button>

          {/* Product Image */}
          <div className="w-18 h-18  border border-white rounded-xl">
          <img  src={popupProduct.poster || popupProduct.images[0]} alt={popupProduct.title} className="w-full h-full object-cover rounded-xl " onClick={() => navigate(`/product/${popupProduct._id}`)}
          />

         </div>
          {/* Product Info */}
          <div className="" onClick={() => navigate(`/product/${popupProduct._id}`)} >
            <p className="font-semibold text-gray-900 text-[16px] truncate w-40">
  {popupProduct.title}
</p>

            <p className="text-emerald-700 font-medium text-sm ">
              ₹{popupProduct.discountedPrice || popupProduct.discountedPrice}
            </p>
            <p className='text-sm'>Added 5 Minutes Ago</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductNotification;
