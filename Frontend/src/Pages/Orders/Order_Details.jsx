import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../State/Orders/Action'
import { updatePayment } from '../../State/Payments/Action'
import Track_Orders from '../../Pages/Orders/Track_Orders'

const Order_Details = () => {
  const [paymentId, setPaymentId] = useState()
  const [paymentStatus, setPaymentStatus] = useState()
  const { orderId } = useParams()
  const dispatch = useDispatch()

  const { order } = useSelector(store => store)

  // Get payment info from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    setPaymentId(urlParams.get("razorpay_payment_link_id"))
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"))
  }, [])

  // Fetch order details and update payment
  useEffect(() => {
    if (!orderId) return
    const data = { orderId, paymentId }
    dispatch(getOrderById(orderId))
    dispatch(updatePayment(data))
  }, [orderId, paymentId])

  // Map order status to step index for Track_Orders
  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0
      case 'CONFIRMED': return 1
      case 'SHIPPED': return 2
      case 'DELIVERED': return 3
      case 'CANCELLED': return 4
      default: return 0
    }
  }

  const activeStep = useMemo(() => getStepIndex(order?.order?.orderStatus), [order])

  return (
    <div className='grid grid-cols-5  gap-10 px-5 py-5 w-full'>
      {/* Track Order Steps */}
      <Track_Orders activeStep={activeStep} orderStatus={order?.order?.orderStatus} />

      {/* Order Items */}
      <div className='col-span-3 flex flex-col gap-4'>
        {order.order?.orderItems?.map((item, index) => (
          <div key={index} className='relative flex gap-4 p-4 bg-white border border-gray-200 rounded-xl'>
            <div className="w-32 h-32 rounded-xl overflow-hidden">
              <img
                src={item.image || item.product?.images?.[0]}
                alt={item.product?.title || item.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-lg text-gray-700 font-semibold">{item.title || item.product?.title}</p>
                <p className="text-emerald-700 font-semibold py-1">{item.product?.brand || item.brand}</p>
                <div className="flex gap-5 items-center">
                  <div className="text-2xl font-semibold text-purple-700">₹{item.discountedPrice.toLocaleString()}</div>
                  <div className="line-through text-lg text-gray-600">₹{item.price.toLocaleString()}</div>
                  <div className="cart-discount">{item.discountPercent}% Off</div>
                </div>
              </div>

              <div className="flex gap-4 py-1 text-sm text-gray-500">
                {item.color && <p>Color: {item.color}</p>}
                {item.size && <p>Size: {item.size}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order_Details
