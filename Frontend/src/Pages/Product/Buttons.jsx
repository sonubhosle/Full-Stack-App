
import { Heart,  ShoppingCart } from 'lucide-react';
const Buttons = ({cart,disabled}) => {
   const handleClick = () => {
    if (disabled) {
      toast.error("Out of Stock");
      return;
    }
    cart();
  };
  return (
      <div className="flex w-full  flex-col sm:flex-row gap-6  ">
        <button 
        onClick={handleClick}
        disabled={disabled}
        className={`group w-full relative cursor-pointer overflow-hidden rounded-xl px-5 py-3.5 text-white transition-all duration-300 
          ${disabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-br from-purple-600 to-indigo-700 hover:scale-105 hover:shadow-blue-500/50 active:scale-95'
          }`}
       >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-400/0 to-blue-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="absolute insset-0 translate-y-full bg-gradient-to-t from-white/20 to-transparent transition-transform duration-500 group-hover:translate-y-0"></div>
          <div className="relative flex items-center justify-center gap-3">
            <ShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="text-lg font-semibold tracking-wide">Add To Cart</span>
          </div>
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}></div>
        </button>

        <button  className="group  w-full relative cursor-pointer  overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 px-5 py-3.5 text-white  transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-400/0 to-emerald-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Heart className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            <span className="text-lg font-semibold tracking-wide">Add To Wishlist</span>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
        </button>
      </div>
  )
}

export default Buttons