import { useState } from 'react';
import { Home, Package, ShoppingCart, Users, UserCircle, Menu, X, ChevronLeft, UserRound, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { user } = useSelector(state => state.auth);
 

    const menuItems = [
        { icon: <Home size={24} />, label: 'Home', path: 'dashboard' },
        { icon: <Package size={24} />, label: 'Products', path: 'products' },
        { icon: <ShoppingCart size={24} />, label: 'Orders', path: 'orders' },
        { icon: <Users size={24} />, label: 'Users', path: 'users' },
        { icon: <UserRound size={24} />, label: 'Profile', path: 'profile' },
    ];



    return (
        <>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`
          fixed lg:relative top-0 left-0 h-screen  bg-white
           z-40 flex flex-col shadow-2xl
          ${isOpen ? 'w-70' : 'w-20 lg:w-20'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-[width,transform] duration-300 ease-in-out
        `}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                        <div className="w-12 h-12 bg-gray-50 border border-gray-100  rounded-xl flex items-center justify-center  ">
                            <LayoutDashboard size={24} className="text-gray-800" />
                        </div>
                        <div className="">
                            <span className="font-bold text-xl whitespace-nowrap text-gray-800">Dashboard</span>
                            <p className='text-purple-700'>Admin</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`hidden lg:flex cursor-pointer items-center justify-center w-10 h-10 flex-shrink-0 rounded-xl transition-all duration-300
    ${isOpen ? ' bg-gray-50 border border-gray-100 text-gray-700 ' : 'bg-emerald-800/10 text-emerald-800 border border-emerald-800/20 '}`}
                        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        <Menu
                            size={22}
                            className={`transition-transform duration-300 ${!isOpen ? 'rotate-180 ' : 'text-gray-800'
                                }`}
                        />
                    </button>


                </div>

                <nav className="flex-1 py-6 px-3 space-y-2 ">
                   {menuItems.map((item, index) => (
  <Link
    key={index}
    to={item.path}
    className="group relative flex items-center gap-4 px-4 py-2 cursor-pointer overflow-visible"
  >
    {/* Icon */}
    <div className="text-gray-800 group-hover:text-purple-800 transition-colors ease-in duration-300 flex-shrink-0">
      {item.icon}
    </div>

    {/* Label (visible when sidebar is open) */}
    <span
      className={`
        font-semibold text-lg text-gray-800 group-hover:text-purple-800 whitespace-nowrap
        transition-all ease-in-out duration-500
        ${isOpen ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-3 overflow-hidden'}
      `}
    >
      {item.label}
    </span>

    {/* Hover Tooltip (visible only when sidebar is closed) */}
    <div
      className={`
        absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 
        bg-purple-700 text-white text-sm rounded-md shadow-lg  
        whitespace-nowrap pointer-events-none
        transition-all duration-300 ease-in-out 
        transform-gpu
        ${!isOpen
          ? 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 visible'
          : 'opacity-0 invisible'
        }
      `}
    >
      {item.label}
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-purple-700 rotate-45 border-l border-b border-purple-700" />
    </div>
  </Link>
))}

                </nav>

                <div className="p-4 border-t border-gray-100 flex-shrink-0">
                    <div
                        className={`flex items-center gap-3 px-3 py-2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-100 justify-center'
                            }`}
                    >
                        {/* Profile Image — always same size */}
                        <div
                            className={`w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-100'
                                }`}
                        >
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Info — collapses smoothly */}
                        <div className={`transition-all duration-300 overflow-hidden ${isOpen  ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0' }`}  >
                            <p className="font-medium text-lg truncate">{user.name}</p>
                            <p className="text-[14px] text-slate-600 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>


            </aside>
        </>
    );
}
