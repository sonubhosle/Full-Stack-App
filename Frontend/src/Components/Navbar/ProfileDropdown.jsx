import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserRound,
  LayoutList,
  HeartPlus,
  Settings,
  ShoppingCart,
  CirclePower,
} from 'lucide-react';

const ProfileDropdown = ({ isOpen, setIsOpen, profileDropdownRef, user, handleLogout }) => {


  return (
    <div className="relative " ref={profileDropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="group flex items-center justify-between px-3 py-1 gap-3 rounded-xl cursor-pointer bg-gray-50 border border-gray-200 hover:bg-emerald-800/10 hover:border-emerald-800/20 transition ease-in duration-300"  >
        <div className="w-10 h-10 bg-white  overflow-hidden rounded-full flex items-center justify-center">
          <img src={user.photo} alt={user.name} />
        </div>
        <div className="hidden lg:block text-right leading-5">
          <p className="text-gray-600 group-hover:text-emerald-800 transition ease-in duration-300">Welcome</p>
          <span className="text-gray-600">{user.name}</span>
        </div>
      </button>

      <div
        className={`absolute z-[9999]  right-0 mt-2 w-56 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 transform transition-all duration-200 origin-top-right ${isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
      >


        <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
          <UserRound className="w-5 h-5 mr-3" /> Account
        </Link>
        <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
          <ShoppingCart className="w-5 h-5 mr-3" /> Cart
        </Link>
        <Link to="/account/orders" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
          <LayoutList className="w-5 h-5 mr-3" /> Orders
        </Link>
        <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
          <HeartPlus className="w-5 h-5 mr-3" /> Wishlist
        </Link>
        <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
          <Settings className="w-5 h-5 mr-3" /> Settings
        </Link>
           {user.role === 'ADMIN' && (
          <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50">
            <Settings className="w-5 h-5 mr-3" /> Admin Dashboard
          </Link>
        )}

        <hr className="text-gray-100" />

        <Link
          to="#"
          onClick={handleLogout}
          className="flex items-center  px-4 py-2 text-gray-700 hover:text-emerald-700 "
        >
          <CirclePower className="w-5 h-5 mr-3" /> Sign Out
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown;
