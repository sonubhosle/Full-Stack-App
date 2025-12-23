import React from 'react'

const Order_Summery_Card = ({ item }) => {
    return (
        <div className='relative flex gap-4 p-4 bg-white border border-gray-200 rounded-xl mb-5 shadow-md hover:shadow-2xl transition ease-in duration-300'>
            <div className="w-30 h-30 rounded-xl overflow-hidden">
                <img
                    src={item.image || item.product?.images?.[0]}
                    alt={item.product?.title || item.title}
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="relative flex-1">
                <p className="text-lg text-gray-700 font-semibold">{item.title || item.product?.title}</p>
                <p className="text-emerald-700 font-semibold py-1">{item.product?.brand || item.brand}</p>
                <div className="flex gap-5 items-center">
                    <div className="text-2xl font-semibold text-purple-700">₹{item.discountedPrice}</div>
                    <div className="line-through text-lg text-gray-600">₹{item.price}</div>
                    <div className="cart-discount">{item.discountPercent}% Off</div>
                </div>
                <div className="flex gap-4 py-1">
                    {item.color && <p className="text-sm font-semibold text-gray-500">Color: {item.color}</p>}
                    {item.size && <p className="text-sm font-semibold text-gray-500">Size: {item.size}</p>}
                </div>

            </div>
        </div>

    )
}

export default Order_Summery_Card
