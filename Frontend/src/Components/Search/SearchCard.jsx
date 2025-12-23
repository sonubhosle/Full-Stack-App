import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../State/Carts/Action";
import { toast } from "react-toastify";
import { Heart, ShoppingCart } from "lucide-react";
import { FaStar } from "react-icons/fa";

const SearchCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mainImage = item.images?.[0] || item.poster || "";
  const selectedVariant = item;

  const navigateDetails = () => {
    // Navigate to main product page, pass variantId if this is a variant
    navigate(`/product/${item.productId || item._id}${item.isVariant ? `?variantId=${item._id}` : ""}`);
  };

  const handleAddToCart = () => {
    const data = {
      productId: item.productId || selectedVariant._id,
      variantId: selectedVariant.isVariant ? selectedVariant._id : undefined,
      size: selectedVariant.sizes?.[0] || "",
      color: selectedVariant.color || "",
    };

    dispatch(addItemToCart(data))
      .then(() => toast.success("Cart added successfully!"))
      .catch(() => toast.error("Failed to add to cart!"));
  };

const stockQty = selectedVariant.isVariant
  ? selectedVariant.stock ?? 0   // variant stock
  : selectedVariant.quantity ?? 0; // main product quantity


  return (
    <div className="w-full relative group bg-white  border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition ease-in duration-300">
        <div className="absolute right-2 top-2 z-10 flex flex-col justify-center text-right gap-3 ">
        <button onClick={handleAddToCart}
          disabled={stockQty === 0}
          className={` w-10 h-10 flex items-center justify-center bg-emerald-700 text-gray-600 py-2 rounded-xl  transition 
           ${stockQty === 0 ? 'bg-white  border border-gray-200 shadow-md cursor-not-allowed' : 'text-white hover:bg-emerald-800'}`}
        >
          <ShoppingCart />
        </button>
        <button className="w-10 h-10 text-gray-600 cursor-pointer flex items-center justify-center rounded-xl bg-white border border-gray-200 shadow-md" ><Heart /></button>

      </div>
      <div className="absolute left-2 top-2 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
        {selectedVariant.discountPercent}% OFF
      </div>
      {/* Image */}
      <div className="w-full h-80 relative rounded-tl-xl rounded-tr-xl overflow-hidden">
        <img src={mainImage} alt={selectedVariant.title} className="w-full h-full object-cover object-top" />
      </div>

     
      {/* Info */}
      <div className="py-2 space-y-2 p-3">
        <div className="flex justify-between">
          <span className="text-[15px] text-gray-700 font-semibold uppercase">{selectedVariant.brand}</span>
          <p className={`font-medium ${stockQty > 0 ? "border border-emerald-700/20 text-sm rounded-xl bg-emerald-600/10 px-2 py-[1px] text-emerald-700" : "border border-red-400/20 text-sm rounded-xl bg-red-400/10 px-2 py-[1px] text-red-400"}`}>
            {stockQty > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div onClick={navigateDetails} className="text-[18px] font-semibold text-gray-900 group-hover:text-emerald-700 transition ease-in duration-200 leading-tight">
          {selectedVariant.title}
        </div>

        {selectedVariant.color && (
          <div className="text-sm text-gray-600">
            Color: <span className="font-medium capitalize">{selectedVariant.color}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-gray-800">₹{selectedVariant.discountedPrice}</div>
            <div className="text-lg line-through text-gray-400">₹{selectedVariant.price}</div>
            <div className="text-sm font-semibold text-green-600">{selectedVariant.discountPercent}% Off</div>
          </div>
          <div className="flex items-center px-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 gap-1">
            <p className="mt-[2px]">{selectedVariant.numRatings}</p>
            <FaStar className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
