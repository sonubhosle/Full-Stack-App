import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUser, logout } from '../../State/Authentication/Action';
import { getCart } from '../../State/Carts/Action';
import ProfileDropdown from './ProfileDropdown';
import CartDropdown from './CartDropdown';
import AuthModal from '../Auth/AuthModal';
import { Menu, X, ShoppingCart, UserRound, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../Data/categories';
import SearchBar from '../Search/SearchBar';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // "profile", "cart", "filter"

  const profileDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem('jwt');
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => { if (jwt) dispatch(getUser(jwt)); }, [jwt, dispatch]);
  useEffect(() => { if (auth.user) setIsAuthModalOpen(false); }, [auth.user]);
  useEffect(() => { dispatch(getCart()); }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setActiveDropdown(null);
    toast.success('Logout Successfully');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleCategoryClick = (name) => { navigate(`/products/${name}`); closeMenu(); };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (profileDropdownRef.current &&
          profileDropdownRef.current.contains(event.target)) ||
        (filterDropdownRef.current &&
          filterDropdownRef.current.contains(event.target)) ||
        (cartDropdownRef.current &&
          cartDropdownRef.current.contains(event.target))
      ) {
        return;
      }

      setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-5 h-20 bg-white shadow-md z-50 sticky top-0">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="md:hidden border border-gray-200 bg-gray-50 text-gray-600 px-3 py-3.5 rounded-xl hover:bg-emerald-700/10 hover:border-emerald-800/20 hover:text-emerald-800 transition ease-in duration-200 z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex gap-3 items-center">
            <p className="w-14 h-14 p-1 border border-gray-200 bg-gray-50 rounded-xl flex items-center justify-center">
              <img src="https://i.postimg.cc/tCrxv0H3/shop-like.png" alt="logo" className="w-full h-full object-contain" />
            </p>
            <div class="hidden sm:block">
              <p class="text-3xl font-extrabold text-gray-900">Sprazo</p>
              <span class="text-gray-600 text-[15px]">Smart Shopping</span>
            </div>


          </Link>
        </div>

        {/* Right: Menus + Profile + Cart */}
        <div className="flex items-center gap-4">
          <SearchBar />


          {/* Center: Desktop Menu */}
          <div className="hidden md:flex items-center ">
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === 'filter' ? null : 'filter')
                }
                className="flex items-center gap-2 font-semibold px-4 py-3 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl cursor-pointer hover:text-emerald-800 hover:bg-emerald-800/10 hover:border-emerald-800/20 transition ease-in duration-300"
              >
                Categories
                <ChevronDown
                  className={`transition-transform ${activeDropdown === 'filter' ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'filter' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full p-4 overflow-hidden mt-2 right-0 w-100 bg-white border border-gray-200 rounded-xl shadow-lg z-50 flex flex-col"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div
                          key={category.name}
                          onClick={() => {
                            handleCategoryClick(category.name);
                            setActiveDropdown(null);
                          }}
                          className="group flex items-center gap-2 px-2 py-2 cursor-pointer border border-gray-200 hover:border-emerald-700 text-gray-700 hover:text-emerald-800 transition ease-in duration-200 rounded-lg"
                        >
                          <img
                            src={category.poster}
                            alt={category.name}
                            className="w-14 h-14 rounded-xl object-contain"
                          />
                          <span className="text-lg capitalize font-semibold text-gray-500 group-hover:text-emerald-800 transition ease-in duration-300">
                            {category.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Profile */}
          {auth.user?.name ? (
            <ProfileDropdown
              isOpen={activeDropdown === 'profile'}
              setIsOpen={() =>
                setActiveDropdown(
                  activeDropdown === 'profile' ? null : 'profile'
                )
              }
              profileDropdownRef={profileDropdownRef}
              user={auth.user}
              handleLogout={handleLogout}
            />
          ) : (
            <div
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 font-semibold px-4 py-3 bg-gray-50 border text-gray-600 border-gray-200 hover:bg-emerald-800/10 hover:text-emerald-800 hover:border-emerald-800/20 transition ease-in duration-300 rounded-xl cursor-pointer"
            >
              <UserRound /> Register
            </div>
          )}

          {/* Cart */}
          <div
            className="relative group cursor-pointer rounded-xl px-4 py-2.5 bg-gray-50 border border-gray-200 hover:bg-emerald-800/10 hover:border-emerald-800/20 transition ease-in duration-300"
            onClick={() =>
              setActiveDropdown(activeDropdown === 'cart' ? null : 'cart')
            }
          >
            <ShoppingCart className="w-7 h-7 text-gray-600 group-hover:text-emerald-700 transition ease-in duration-300" />
            <div className="absolute -top-2 -right-2 bg-emerald-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cart.cartItems?.length ?? 0}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside className="fixed inset-0 z-50 md:hidden pointer-events-none">
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={closeMenu}
        />
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-2xl font-bold">Menu</span>
            <button onClick={closeMenu}>
              <X size={24} />
            </button>
          </div>
          <nav className="p-4 flex flex-col gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="group flex items-center gap-2 px-2 py-2 cursor-pointer border border-gray-200 hover:border-emerald-700 text-gray-700 hover:text-emerald-800 transition ease-in duration-200 rounded-lg"
              >
                <img
                  src={category.poster}
                  alt={category.name}
                  className="w-14 h-14 rounded-xl object-contain"
                />
                <span className="text-lg capitalize font-semibold text-gray-500 group-hover:text-emerald-800 transition ease-in duration-300">
                  {category.name}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* Cart Dropdown */}
      <CartDropdown
        ref={cartDropdownRef}
        isOpen={activeDropdown === 'cart'}
        setIsCartOpen={() =>
          setActiveDropdown(activeDropdown === 'cart' ? null : 'cart')
        }
        user={auth.user}
      />
    </>
  );
};

export default Navigation;
