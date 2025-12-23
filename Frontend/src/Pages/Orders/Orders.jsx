import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Order_Card from './Order_Card';
import { getAllOrders } from '../../State/Orders/Action';
import { Search, ChevronDown } from 'lucide-react';
import Heading from '../../Components/Heading/Heading';
import { motion, AnimatePresence } from 'framer-motion';
import { Pagination } from '../../UI/Pagination';

const statusOptions = ['Delivered', 'Cancelled', 'Shipped', 'Placed', 'Pending'];

const Orders = () => {
  const [Statuses, setStatuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ordersPerPage = 6;

  const orders = useSelector(state => state.order.orders);
  const dispatch = useDispatch();
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = orders.filter(order => {
        const orderStatus = order.orderStatus ? order.orderStatus.toUpperCase() : '';
        const matchesStatus = Statuses.length === 0 || Statuses.includes(orderStatus);
        const matchesSearch = order.orderItems.some(item =>
          item.product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesStatus && matchesSearch;
      });

      setFilteredOrders(filtered);
      setLoading(false);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [Statuses, searchTerm, orders]);

  const handleStatusChange = (status) => {
    const formattedStatus = status.toUpperCase();
    setStatuses(prev =>
      prev.includes(formattedStatus) ? prev.filter(s => s !== formattedStatus) : [...prev, formattedStatus]
    );
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <>
      <Heading heading={'My Orders'} subtitle={''} icon={null} />

      {/* Top controls: Search + Dropdown Button */}
      <div className="px-5 mb-5 ">
        <div className="bg-white py-3 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 px-5">
        {/* Search */}
        <div className="flex-1 max-w-md w-full relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Order"
            className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2 focus:border-emerald-700 outline-none transition"
          />
          <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700" />
        </div>

        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:border-emerald-600 transition"
          >
            Filter by Status
            <ChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-full overflow-hidden mt-2 right-0 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 flex flex-col"
              >
                {statusOptions.map((status, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-emerald-700/10 text-gray-700 hover:text-emerald-800 transition ease-in duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={Statuses.includes(status.toUpperCase())}
                      onChange={() => handleStatusChange(status)}
                      className="w-4 h-4 rounded-2xl accent-emerald-800"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      </div>
      {/* Orders List */}
      <div className="px-5 mb-6">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <p className='text-xl text-emerald-700 font-semibold bg-white px-5 py-5 border border-gray-200 rounded-xl'>Loading...</p>
          </div>
        ) : paginatedOrders.length > 0 ? (
          <>
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
              {paginatedOrders.map(order => (
                <Order_Card key={order._id} order={order} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination current={currentPage} total={totalPages || 1} onPageChange={setCurrentPage} />
          </>
        ) : (
         <div className="w-full h-50 flex items-center justify-center">
          <div className="bg-white text-center rounded-xl px-5 py-5 border border-gray-200 space-y-2">
            <h1 className='text-4xl font-semibold text-gray-600'>Ohh No!</h1>
            <p className='text-lg font-semibold text-gray-700'>Orders</p>
            <p className='bg-red-600/10 text-red-600 font-semibold border border-red-600/20 px-3 py-2 rounded-xl'>Not Found</p>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default Orders;
