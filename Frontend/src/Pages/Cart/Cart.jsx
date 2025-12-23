import React, { useEffect } from 'react';
import Cart_Card from './Cart_Card';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../State/Carts/Action';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCheckout = () => {
    navigate('/checkout?step=2');
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem, dispatch]);

  const isCartEmpty = !cart.cart?.cartItems || cart.cart.cartItems.length === 0;

  return (
    <>
      {isCartEmpty ? (
        <EmptyCart/>
      ) : (
        // 🧺 CART WITH ITEMS
        <div className="grid grid-cols-5 px-5 py-5 gap-15 bg-gray-50 min-h-screen">
          {/* LEFT SIDE - ITEMS */}
          <div className="col-span-3">
            {cart.cart.cartItems.map((item, index) => (
              <Cart_Card item={item} key={index} />
            ))}

            {/* Place Order Button */}
            <div className="bg-white flex items-center justify-between p-4 border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300">
              <p className="text-lg font-semibold text-gray-800">Place Your Order</p>
              <button
                onClick={handleCheckout}
                className="px-5 cursor-pointer py-2 bg-gradient-to-bl from-emerald-700 to-emerald-900 text-white rounded-xl font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - PRICE DETAILS */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300">
            <h3 className="text-2xl font-semibold text-gray-600 px-4 py-3 border-b border-gray-200">
              Price Details
            </h3>
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between text-xl">
                <p>Price</p>
                <p>₹{cart.cart?.totalPrice}</p>
              </div>
              <div className="flex items-center justify-between text-xl">
                <p>Discount</p>
                <div className="text-emerald-800 font-semibold">-₹{cart.cart?.discount}</div>
              </div>
              <div className="flex items-center justify-between text-xl">
                <p>Delivery Charges</p>
                <div className="bg-emerald-700/10 rounded-xl border px-4 py-1 border-emerald-700/30 text-emerald-700 font-semibold">
                  Free
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 mt-5 mb-5"></div>
              <div className="flex items-center justify-between">
                <div className="font-semibold text-2xl text-emerald-700">Total Amount</div>
                <div className="font-semibold text-2xl text-emerald-700">
                  ₹{cart.cart?.totalDiscountPrice}
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 mt-5 mb-5"></div>

              <p className="bg-emerald-700/10 rounded-xl border px-4 py-1.5 border-emerald-700/30 text-emerald-700 font-semibold">
                You will save ₹{cart.cart?.discount} on this order
              </p>
              <button
                className="w-full text-2xl py-3 cursor-pointer bg-gradient-to-bl from-emerald-700 to-emerald-900 text-white rounded-xl font-semibold"
                onClick={handleCheckout}
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
