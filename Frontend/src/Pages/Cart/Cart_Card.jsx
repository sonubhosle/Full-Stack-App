import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../State/Carts/Action';
import { toast } from 'react-toastify';
import { Minus, Plus, Trash } from 'lucide-react';

const Cart_Card = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const newQuantity = item.quantity + num;
    if (newQuantity < 1) return;

    const data = { cartItemId: item._id, data: { quantity: newQuantity } };

    dispatch(updateCartItem(data))
      .then(() => toast.success('Cart updated successfully'))
      .catch(() => toast.error('Failed to update cart'));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id))
      .then(() => toast.success('Cart item removed successfully'))
      .catch(() => toast.error('Failed to remove cart item'));
  };

  // Use per-unit price from product or fallback to item
  const unitPrice = item.product?.price || item.price;
  const unitDiscountedPrice = item.product?.discountedPrice || item.discountedPrice;
  const discountPercent = item.discountPercent || 0;

  return (
    <div className="relative flex gap-4 p-4 bg-white border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300">
      <div className="w-35 h-40 rounded-xl overflow-hidden">
        <img
          src={item.image || item.product?.images?.[0]}
          alt={item.product?.title || item.title}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="relative flex-1">
        <p className="text-lg text-gray-700 font-semibold">{item.product?.title || item.title}</p>
        <p className="text-emerald-700 font-semibold py-1">{item.product?.brand || item.brand}</p>

        {/* Display per-unit price */}
        <div className="flex gap-5 items-center">
          <div className="text-2xl font-semibold text-purple-700">₹{unitDiscountedPrice}</div>
          <div className="line-through text-lg text-gray-600">₹{unitPrice}</div>
          <div className="cart-discount">{discountPercent}% Off</div>
        </div>

        {/* Show color and size */}
        <div className="flex gap-4 py-1">
          {item.color && <p className="text-sm font-semibold text-gray-500">Color: {item.color}</p>}
          {item.size && <p className="text-sm font-semibold text-gray-500">Size: {item.size}</p>}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-4 mt-3">
          <button
            className="cursor-pointer bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl"
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <p>{item.quantity}</p>
          <button
            className="cursor-pointer bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl"
            onClick={() => handleUpdateCartItem(1)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

   

        {/* Delete button */}
        <button
          className="cursor-pointer absolute right-0 bottom-0 bg-red-100 text-red-500 border border-red-400 px-3 py-1.5 rounded-xl flex items-center gap-2 text-lg font-semibold"
          onClick={handleRemoveCartItem}
        >
          <Trash className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Cart_Card;
