import React, { forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, updateCartItem, removeCartItem } from '../../State/Carts/Action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Sparkles, X, Minus, Plus, Trash } from 'lucide-react';

const CartDropdown = forwardRef(({ isOpen, setIsCartOpen, user }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) dispatch(getCart());
  }, [dispatch, user]);

  const handleUpdateCartItem = (item, num) => {
    const newQty = item.quantity + num;
    if (newQty < 1) return;

    const data = { cartItemId: item._id, data: { quantity: newQty } };
    dispatch(updateCartItem(data))
      .then(() => toast.success('Cart updated'))
      .catch(() => toast.error('Failed to update cart'));
  };

  const handleRemoveCartItem = (itemId) => {
    dispatch(removeCartItem(itemId))
      .then(() => toast.success('Item removed'))
      .catch(() => toast.error('Failed to remove item'));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout?step=2');
  };

  const totalPrice = cartState.cart?.cartItems?.reduce(
    (acc, item) => acc + ((item.variant?.discountedPrice || item.product?.discountedPrice || 0) * item.quantity),
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
      ref={ref}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-[9999] transform transition-transform duration-300 flex flex-col ${
          isOpen ? '-translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()} // Stops clicks inside panel from closing
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold">
              Welcome, <br />
              <span className="text-emerald-700">{user?.name} {user?.surname}</span>
            </h2>
            <p className="text-gray-600">Here’s your cart</p>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <X className="text-gray-800" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartState.cart?.cartItems?.length > 0 ? (
            cartState.cart.cartItems.map((item) => {
              const product = item.product || {};
              const variant = item.variant || {};
              const image = variant.images?.[0] || product.images?.[0] || product.poster || '';
              const title = variant.title || product.title;
              const brand = product.brand;
              const discountedPrice = variant.discountedPrice || product.discountedPrice || 0;
              const originalPrice = variant.price || product.price || 0;
              const discountPercent = variant.discountPercent || product.discountPercent || 0;

              return (
                <div key={item._id} className="relative flex gap-4 p-2 bg-white border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300">
                  <div className="w-25 h-30 rounded-xl overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between relative">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{title}</p>
                      {brand && <p className="text-sm text-emerald-700 font-semibold py-1">{brand}</p>}
                      <div className="flex gap-5 items-center">
                        <div className="text-xl font-semibold text-purple-700">₹{discountedPrice}</div>
                        {discountPercent > 0 && <div className="line-through text-lg text-gray-600">₹{originalPrice}</div>}
                        {discountPercent > 0 && <div className="cart-discount">{discountPercent}% Off</div>}
                      </div>
                    
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        className="cursor-pointer bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl"
                        onClick={() => handleUpdateCartItem(item, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        className="cursor-pointer bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl"
                        onClick={() => handleUpdateCartItem(item, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                      className="absolute right-0 bottom-0 bg-red-100 text-red-500 border border-red-400 px-3 py-1.5 rounded-xl flex items-center gap-2 text-lg font-semibold"
                      onClick={() => handleRemoveCartItem(item._id)}
                    >
                      <Trash className="w-4 h-4" /> 
                    </button>
                    </div>

                    {/* Delete Button */}
                    
                  </div>
                </div>
              );
            })
          ) : (
             <div className="max-h-screen text-center">
              <div className="flex justify-center  ">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Cart Icon Container with smooth rotation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative animate-float-smooth">
                      <ShoppingCart size={80} className="text-blue-600 relative z-10 drop-shadow-lg" strokeWidth={1.2} />
                      <div className="absolute -top-4 -right-4 animate-spin-slow">
                        <Sparkles size={24} className="text-cyan-400" fill="currentColor" />
                      </div>
                      <div className="absolute -bottom-2 -left-4 animate-pulse animation-delay-1000">
                        <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50" />
                      </div>
                      <div className="absolute top-1/2 -right-6 animate-pulse animation-delay-500">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>


              <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent tracking-tight leading-tight'>
                Your cart is empty
              </h1>
              <p className="text-lg mt-5 md:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed font-light">
                Don't worry! Explore our amazing collection and discover something you'll love.
              </p>

              <button onClick={() => setIsCartOpen(false)} className="group mb-5 mt-6 relative inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shimmer" />
                <span className="relative flex items-center gap-3">
                  Continue Shopping
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </div>
      
          )}
        </div>

        {/* Total & Checkout */}
        {cartState.cart?.cartItems?.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between mb-2 font-semibold">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default CartDropdown;


           