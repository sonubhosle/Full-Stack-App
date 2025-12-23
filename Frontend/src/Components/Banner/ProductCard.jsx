import { useState } from 'react';
import { ShoppingCart, Star, Heart, Package } from 'lucide-react';



export default function ProductCard({
  product,
  position,
  isFlipping,
  direction,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const handleAddToCart = () => {
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 2000);
  };

  const getCardTransform = () => {
    if (position === 'current') {
      const rotateY = isFlipping ? (direction === 'right' ? 90 : -90) : 0;
      const scale = isFlipping ? 0.85 : 1;
      return {
        transform: `rotateY(${rotateY}deg) scale(${scale}) translateZ(0px)`,
        opacity: isFlipping ? 0 : 1,
        zIndex: 30,
      };
    } else if (position === 'prev') {
      return {
        transform: `rotateY(${isFlipping ? 0 : -15}deg) scale(0.85) translateX(-60%) translateZ(-100px)`,
        opacity: isFlipping ? 0.6 : 0.4,
        zIndex: 10,
        pointerEvents: 'none',
      };
    } else {
      return {
        transform: `rotateY(${isFlipping ? 0 : 15}deg) scale(0.85) translateX(60%) translateZ(-100px)`,
        opacity: isFlipping ? 0.6 : 0.4,
        zIndex: 10,
        pointerEvents: 'none' ,
      };
    }
  };

  const cardStyle = getCardTransform();

  return (
    <div
      className="absolute w-full max-w-[320px] md:max-w-[380px]"
      style={{
        ...cardStyle,
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative">
        {/* Cart Notification */}
        {showCartNotification && position === 'current' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Added to Cart!</span>
          </div>
        )}
        {/* Product Image */}
        <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
              {product?.brand}
            </div>
          
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                {product?.discountPercent}% OFF
              </div>
           
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => position === 'current' && setIsWishlisted(!isWishlisted)}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isWishlisted
                ? 'bg-red-500 shadow-lg scale-110'
                : 'bg-white/90 hover:bg-white hover:scale-110'
            }`}
            disabled={position !== 'current'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-white text-white' : 'text-slate-700'
              }`}
            />
          </button>

          {/* Stock Badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-600">{product?.quantity}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 space-y-4">
          {/* Brand & Rating */}
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {product?.brand}
            </span>

          {/* Product Name */}
          <div>
            <h3 className="text-xl font-bold text-slate-900  leading-tight">{product?.title}</h3>
          </div>

   

          {/* Price Section */}
          <div className="flex items-end gap-3 ">
            <div>
              <p className="text-3xl font-bold text-slate-900">₹{product?.discountedPrice}</p>
              
                <p className="text-sm text-slate-500 line-through">${product?.price}</p>
             
            </div>
            
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={position !== 'current'}
            className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 flex items-center justify-center gap-2 group "
          >
            <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
