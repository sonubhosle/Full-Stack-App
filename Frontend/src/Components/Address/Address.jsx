import { Building2, Earth, Mail, Navigation, Phone, Pin, UserRound } from 'lucide-react'
import React from 'react'

const Address = ({ address }) => {
    return (

        <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 space-y-3">
            <p className='flex gap-2 text-lg text-gray-600'><UserRound className='w-5 mt-1 h-5' /> {address?.name} {address?.surname}</p>
            <p className='flex gap-2 text-lg text-gray-600'><Phone className='w-5 mt-1 h-5' /> {address?.mobile}</p>
            <p className='flex gap-2 text-lg text-gray-600'><Mail className='w-5 mt-1 h-5' /> {address?.email}</p>

            <p className='flex gap-2 text-lg text-gray-600 line-clamp-1 truncate'><Navigation className='w-5 mt-1 h-5' /> {address?.landmark}</p>
            <p className='flex gap-2 text-lg text-gray-600'><Pin className='w-5 mt-1 h-5' />Pincode {address?.pincode}</p>
            <p className='flex gap-2 text-lg text-gray-600'><Building2 className='w-5 mt-1 h-5' /> {address?.city}, {address?.state}</p>
            <p className='flex gap-2 text-lg text-gray-600'><Earth className='w-5 mt-1 h-5' /> {address?.country}</p>

        </div>
    )
}

export default Address