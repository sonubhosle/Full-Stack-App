import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteOrder } from '../../State/Orders/Action';
import { toast } from 'react-toastify';
import { Star } from 'lucide-react';

const Order_Card = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleOrderClick = (orderId) => {
    navigate(`/account/order/${orderId}`);
  };
  

// Pass variantId if it exists
const handleRating = (productId, variantId) => {
  const query = variantId ? `?variant=${variantId}` : '';
  navigate(`/product/${productId}/reviews-ratings${query}`);
};



  const handleDeleteClick = (orderId) => {
    dispatch(deleteOrder(orderId));
    toast.success('Order deleted successfully!');
  };

  const formatDate = (date) => {
    const options = { month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getStatusColors = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return { bg: '#d1fae5', text: '#059669' };
      case 'cancelled':
        return { bg: '#fee2e2', text: '#b91c1c' };
      case 'shipped':
        return { bg: '#e0e7ff', text: '#3730a3' };
      case 'placed':
        return { bg: '#fef3c7', text: '#b45309' };
      case 'pending':
        return { bg: '#fef9c3', text: '#78350f' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <>
      {
        order.orderItems.map((orderItem) => (
          <div
            className="relative group flex gap-4 p-4 bg-white border border-gray-200 rounded-xl   hover:shadow-2xl transition ease-in duration-300"
            key={orderItem.product._id}
          >
            {/* Image */}
            <div className="w-32 h-36 bg-white rounded-xl flex-shrink-0 overflow-hidden" >
              <img
                src={orderItem.image || orderItem.product?.images?.[0]}
                alt={orderItem.product?.title || orderItem.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-800 cursor-pointer text-lg font-semibold leading-tight group-hover:text-emerald-700 transition ease-in duration-200" onClick={() => handleOrderClick(order._id)} >
                    {orderItem.title || orderItem.product?.title}
                  </div>
                  <div className=" text-gray-500 uppercase mt-1">{orderItem.product?.brand || orderItem.brand}</div>
                  <div className="text-2xl font-semibold text-emerald-700 ">₹{orderItem.discountedPrice}</div>
                </div>

              </div>

              <div className="flex gap-4 mt-1">
                {orderItem.color && <p className="text-sm font-semibold text-gray-500">Color: {orderItem.color}</p>}
                {orderItem.size && <p className="text-sm font-semibold text-gray-500">Size: {orderItem.size}</p>}
              </div>
              {/* Rate & Review */}
              <div className="flex mt-1 gap-3">
                <div className="flex items-center  ">
                  <span className="px-4 py-1 rounded-full text-sm font-semibold" style={{
                    backgroundColor: getStatusColors(order.orderStatus).bg,
                    color: getStatusColors(order.orderStatus).text,
                  }}>
                    {order.orderStatus.toUpperCase()} {formatDate(order.deliveryDate || order.orderDate)}
                  </span>
                </div>
<div
  className="px-2 rounded-full flex items-center gap-1 text-yellow-500 bg-yellow-500/10 cursor-pointer"
  onClick={() => handleRating(orderItem.product._id, orderItem.variant)}
>
  <Star className='w-4 h-4 mb-1' /> Rate & Review
</div>



                <button className="bg-red-500/10  text-red-500 px-3 cursor-pointer py-1 rounded-full " onClick={() => handleDeleteClick(order._id)}  >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Order_Card;
