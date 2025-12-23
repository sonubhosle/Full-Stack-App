import React from 'react'
import { createOrder } from '../../State/Orders/Action'
import { Building2, Earth, Mail, Navigation, Phone, Pin, UserRound } from 'lucide-react'

const Address_Card = ({ addr, index, selectedAddress, dispatch, handleAddressSelect, navigate }) => {

    return (
        <div key={index} className="bg-white border border-gray-200 rounded-xl  space-y-3 ">
            <label htmlFor={`address-${index}`} className="custom-radio-label">
                <div className="space-y-3 px-4 py-4">
                    <p className='flex gap-2 text-lg text-gray-600'><UserRound className='w-5 mt-1 h-5' /> {addr.name} {addr.surname}</p>
                    <div className="flex items-center gap-4">
                        <p className='flex gap-2 text-lg text-gray-600'><Phone className='w-5 mt-1 h-5' /> {addr.mobile}</p>
                        <p className='flex gap-2 text-lg text-gray-600'><Mail className='w-5 mt-1 h-5' /> {addr.email}</p>
                    </div>

                    <p className='flex gap-2 text-lg text-gray-600'><Navigation className='w-5 mt-1 h-5' /> {addr.landmark}</p>
                    <p className='flex gap-2 text-lg text-gray-600'><Pin className='w-5 mt-1 h-5' />Pincode {addr.pincode}</p>
                    <div className="flex items-center gap-4">
                        <p className='flex gap-2 text-lg text-gray-600'><Building2 className='w-5 mt-1 h-5' /> {addr.city}, {addr.state}</p>
                        <p className='flex gap-2 text-lg text-gray-600'><Earth className='w-5 mt-1 h-5' /> {addr.country}</p>

                    </div>
                </div>

            </label>
            <div className="w-full h-[1px] bg-gray-100"></div>
            <div className=" flex items-center gap-5  px-5 py-4 ">
                <div className="bg-gray-50 px-4 py-3 border border-gray-200 rounded-xl ">
                    <input type="checkbox" id={`address-${index}`} name="address" value={JSON.stringify(addr)}
                        checked={JSON.stringify(addr) === JSON.stringify(selectedAddress)}
                        onChange={handleAddressSelect} className='accent-emerald-700 transform scale-150' />
                </div>
                <button className="cursor-pointer bg-gradient-to-br from-emerald-700 to-emerald-900 text-white text-lg px-5 py-2 rounded-sm" type='submit' onClick={() => dispatch(createOrder({ address: addr, navigate }))}>
                    Deliver Here
                </button>
            </div>
        </div>
    )
}

export default Address_Card