import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrder, deliverOrder, getOrder, shipOrder, cancelOrder, deleteOrder } from '../State/Admin_Orders/Action';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import AdminHeading from '../AdminHeading/AdminHeading';
import { SquarePen, Trash } from 'lucide-react';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.adminOrder);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleAction = (action, orderId) => {
    const actions = {
      confirm: confirmOrder,
      ship: shipOrder,
      deliver: deliverOrder,
      cancel: cancelOrder,
      delete: deleteOrder
    };

    dispatch(actions[action](orderId))
      .then(() => {
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)} action completed!`);
        dispatch(getOrder());
        setOpenMenuIndex(null);
      })
      .catch((err) => {
        toast.error(err.message || 'Something went wrong');
      });
  };

  if (loading) return <div className="flex justify-center text-lg items-center h-64 text-emerald-800 bg-white">Loading...</div>;
  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;

  return (
    <div className="p-4">
      <AdminHeading heading={'Orders'} subheading={'Users Orders'} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        {orders?.map((order, index) => (
          <div key={order._id} className="relative flex  justify-between bg-white p-2 border border-gray-200 hover:shadow-2xl rounded-xl transition ease-in duration-300">
            <div className="flex gap-4">
              {/* Products */}
              <div className="flex -space-x-2">
                {order.orderItems.map(item => (
                  <div className="w-[100px] h-[100px] flex items-center relative overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.product?.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                ))}
              </div>

              <div className="">
                {/* Order Info */}

                {order.orderItems.map(item => (
                  <>
                  <p key={item.product._id} className='font-semibold text-gray-700'>{item.product?.title}</p>
                   <p  className='text-sm text-gray-700'>{item.product?.brand}</p>
                  </>
                ))}
                <p className='text-xl text-green-800 font-semibold mb-1'> ₹{Number(order.totalDiscountPrice).toLocaleString()}</p>
                <span
                  className={`px-2 py-1 rounded-[6px] text-white text-sm font-semibold
                    ${order.orderStatus === "CONFIRMED" ? "bg-green-800" :
                      order.orderStatus === "SHIPPED" ? "bg-blue-600" :
                        order.orderStatus === "DELIVERED" ? "bg-purple-600" :
                          order.orderStatus === "PLACED" ? "bg-yellow-600" :
                            order.orderStatus === "CANCELLED" ? "bg-red-600" : "bg-gray-600"}`}
                >
                  {order.orderStatus}
                </span>






              </div>

            </div>
            <div className=" flex flex-col gap-3">
              {/* Action Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleMenu(index)}
                  className="w-10 h-10 cursor-pointer flex items-center justify-center bg-green-800/10 border border-green-800/20 rounded-xl text-green-800"
                >
                  <SquarePen size={25} />
                </button>

                <AnimatePresence>
                  {openMenuIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-1 w-50 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 overflow-hidden"
                    >
                      <button className="w-full cursor-pointer text-left px-3 py-1 text-gray-800 font-semibold uppercase hover:bg-green-800/10 hover:text-green-800 transition ease-in duration-300" onClick={() => handleAction('confirm', order._id)} >
                        Confirm Order
                      </button>
                      <button className="w-full cursor-pointer text-left px-3 py-1 text-gray-800 font-semibold uppercase hover:bg-green-800/10 hover:text-green-800 transition ease-in duration-300" onClick={() => handleAction('ship', order._id)}>
                        Ship Order
                      </button>
                      <button className="w-full cursor-pointer text-left px-3 py-1 text-gray-800 font-semibold uppercase hover:bg-green-800/10 hover:text-green-800 transition ease-in duration-300" onClick={() => handleAction('deliver', order._id)}>
                        Deliver Order
                      </button>
                      <button className="w-full cursor-pointer text-left px-3 py-1 text-gray-800 font-semibold uppercase hover:bg-green-800/10 hover:text-green-800 transition ease-in duration-300" onClick={() => handleAction('cancel', order._id)} >
                        Cancel Order
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Delete button outside dropdown */}
              <button
                onClick={() => handleAction('delete', order._id)}
                className="cursor-pointer flex items-center justify-center rounded-xl w-10 h-10 py-1 border border-red-600/20 text-red-600  bg-red-600/10 "
              >
                <Trash size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
