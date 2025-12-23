import React, { useEffect } from 'react'
import Address from '../Address/Address'
import Order_Summery_Card from '../../Pages/Orders/Order_Summery_Card'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOrderById } from '../../State/Orders/Action'
import { createPayment } from '../../State/Payments/Action'
import { ScrollText } from 'lucide-react'

const Order_Summery = () => {

  const dispatch = useDispatch();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');
  const { order } = useSelector(store => store)

  console.log(order)
  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [orderId])

  const handleCheckout = () => {
    dispatch(createPayment(orderId))
  }


  return (

    <>
      <div className='py-5 w-full' >
        <h1 className='flex items-center gap-2 text-2xl font-semibold text-gray-600'>
          <ScrollText /> Order Summary</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 '>
   
        <div className='md:col-span-3 lg:col-span-4'>
            {order.order?.orderItems.map((item, index) => (<Order_Summery_Card item={item} key={index} />))}

        </div>
             <div class=" md:col-span-2 lg:col-span-2">
          <Address address={order.order?.shippingAddress} />
        </div>
        
             <div className="md:col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300">
            <h3 className="text-2xl font-semibold text-gray-600 px-4 py-3 border-b border-gray-200">
              Price Details
            </h3>
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between text-xl">
                <p>Price</p>
                <p>₹{order.order?.totalPrice}</p>
              </div>
              <div className="flex items-center justify-between text-xl">
                <p>Discount</p>
                <div className="text-emerald-800 font-semibold">-₹{order.order?.discount}</div>
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
                  ₹{order.order?.totalDiscountPrice}
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 mt-5 mb-5"></div>

              <p className="bg-emerald-700/10 rounded-xl border px-4 py-1.5 border-emerald-700/30 text-emerald-700 font-semibold">
                You will save ₹{order.order?.discount} on this order
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
    </>
  )
}

export default Order_Summery