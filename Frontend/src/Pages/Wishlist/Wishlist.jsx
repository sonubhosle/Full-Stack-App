import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { getWishlist, removeFromWishlist } from "../../State/Wishlist/Action";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist = [], loading } = useSelector((state) => state.wishlist); // ensure array

  // Fetch wishlist on mount
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = async (productId, variantId = null) => {
    try {
      await dispatch(removeFromWishlist(productId, variantId));
      toast.info("Removed from wishlist");
      dispatch(getWishlist());
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading wishlist...</p>;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">
        <p>Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-5">
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-2">
        {wishlist.map((item) => {
          const product = item.productId;
          const variant = product.variants?.find((v) => v._id === item.variantId);
          const displayItem = variant ? { ...product, ...variant } : product;

          return (
            <div key={item._id}
              className="flex group  justify-between rounded-xl border  border-gray-200  overflow-hidden  p-3 relative bg-white hover:shadow-2xl transition ease-in duration-300 "  >
              {/* Remove button */}
              <div className="flex gap-4">

                {/* Image */}
                <div className="w-20 h-20 overflow-hidden rounded-xl relative bg-red-200">
                  <img src={displayItem.images?.[0]} alt={displayItem.title} className=" object-contain object-top" />
                </div>
                {/* Info */}
                <div className="">
                  <h3 className="font-semibold text-[17px] text-gray-900 group-hover:text-purple-800 transition ease-in duration-300">{displayItem.title}</h3>
                  <p className="text-sm text-gray-600">{displayItem.brand}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-lg text-purple-800">₹{displayItem.discountedPrice}</span>
                    {displayItem.price &&
                      displayItem.discountedPrice !== displayItem.price && (
                        <span className="line-through text-gray-400 text-sm">
                          ₹{displayItem.price}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              <div className="flex  gap-4">
                <button onClick={() => handleRemove(product._id, item.variantId)} className=" w-10 h-10 flex items-center justify-center border border-red-500/20 bg-red-500/10  rounded-xl shadow-md text-red-500 hover:shadow-2xl transition ease-in duration-300 " >  <Heart fill="red" size={25} /> </button>
                <button onClick={() => handleRemove(product._id, item.variantId)} className="w-10 h-10 flex items-center justify-center border border-emerald-800/20 bg-emerald-800/10  rounded-xl shadow-md text-emerald-800 hover:shadow-2xl transition ease-in duration-300" >  <ShoppingCart size={25} /> </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
