import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../State/Carts/Action";
import { addToWishlist, removeFromWishlist } from "../../State/Wishlist/Action";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  // Merge main product + its variants
  const allVariants = [item, ...(item.variants || [])];

  const [selectedVariant, setSelectedVariant] = useState(allVariants[0]);
  const [mainImage, setMainImage] = useState(allVariants[0].images?.[0] || "");

  const navigateDetails = () => {
    navigate(`/product/${item._id}?variantId=${selectedVariant._id}`);
  };

  const handleAddToCart = () => {
    const data =
      selectedVariant._id !== item._id
        ? {
            productId: item._id,
            variantId: selectedVariant._id,
            size: selectedVariant.sizes?.[0] || "",
            color: selectedVariant.color || "",
          }
        : {
            productId: item._id,
            size: selectedVariant.sizes?.[0] || "",
            color: selectedVariant.color || "",
          };

    dispatch(addItemToCart(data));
    toast.success("Cart added successfully!");
  };

  // Wishlist logic
  const variantIdToCheck = selectedVariant._id === item._id ? null : selectedVariant._id;

// Ensure wishlist is always an array
const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

// Find the wishlist entry for this product + variant
const wishlistEntry = safeWishlist.find(
  (w) =>
    w.productId._id.toString() === item._id.toString() &&
    ((variantIdToCheck === null && !w.variantId) ||
     (variantIdToCheck && w.variantId?.toString() === variantIdToCheck.toString()))
);

const isInWishlist = !!wishlistEntry; 

const handleWishlistToggle = () => {
  const variantIdToSend = selectedVariant._id === item._id ? null : selectedVariant._id;

  if (isInWishlist) {
    // Pass the wishlist entry _id if needed by backend, otherwise productId + variantId
    dispatch(removeFromWishlist(item._id, variantIdToSend))
      .then(() => toast.info("Removed from wishlist"));
  } else {
    dispatch(addToWishlist(item._id, variantIdToSend))
      .then(() => toast.success("Added to wishlist"));
  }
};



  const stockQty =
    selectedVariant._id === item._id ? item.quantity ?? 0 : selectedVariant.stock ?? 0;

  return (
    <div className="w-full relative group overflow-hidden bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-2xl transition ease-in duration-300">

      {/* Buttons: Cart & Wishlist */}
      <div className="absolute right-2 top-2 z-10 flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={stockQty === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition 
            ${stockQty === 0
              ? "bg-white border border-gray-200 shadow-md cursor-not-allowed text-gray-400"
              : "bg-emerald-700 text-white hover:bg-emerald-800"}`}
        >
          <ShoppingCart />
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border shadow-md transition ${
            isInWishlist
              ? "bg-white  border-red-500"
              : "bg-white  border-gray-300"
          }`}
        >
         <FaHeart
  fill={isInWishlist ? "red" : "#696969"}

  size={25}
/>

        </button>
      </div>

      {/* Discount Badge */}
      {selectedVariant.discountPercent > 0 && (
        <div className="absolute left-2 top-2 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
          {selectedVariant.discountPercent}% OFF
        </div>
      )}

      {/* Product Image & Variants */}
      <div className="w-full h-90 relative rounded-tl-xl rounded-tr-xl overflow-hidden">
        <img src={mainImage} alt={selectedVariant.title} className="w-full h-full object-cover object-top" />

        {allVariants.length > 1 && (
          <div className="absolute w-full bg-gray-950/10 py-2 bottom-0 left-0 flex gap-2 justify-center mt-2 px-3">
            {allVariants.map((variant, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 border-3 rounded-md cursor-pointer overflow-hidden ${
                  selectedVariant._id === variant._id ? "border-purple-700" : "border-gray-300 grayscale-100"
                }`}
                onClick={() => {
                  setSelectedVariant(variant);
                  setMainImage(variant.images[0]);
                }}
              >
                <img src={variant.images?.[0]} alt={variant.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="py-2 space-y-2 p-3">
        <div className="flex justify-between">
          <span className="text-[15px] text-gray-700 font-semibold uppercase">{selectedVariant.brand || item.brand}</span>
          <p className={`font-medium ${stockQty > 0 ? 'border border-emerald-700/20 text-sm rounded-xl bg-emerald-600/10 px-2 py-[1px] text-emerald-700' : 'border border-red-400/20 text-sm rounded-xl bg-red-400/10 px-2 py-[1px] text-red-400'}`}>
            {stockQty > 0 ? 'In Stock' : 'Out of Stock'}
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

export default Card;
