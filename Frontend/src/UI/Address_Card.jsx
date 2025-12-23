import React from 'react'
import {  FilePenLine, Trash, UserRound, Phone, Mail,  Pin, Navigation, Building2, Earth} from 'lucide-react';

const Address_Card = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 '>
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 space-y-3">
                <p className='flex gap-2 text-lg text-gray-600'><UserRound className='w-5 mt-1 h-5' /> {item.name} {item.surname}</p>
                <div className="flex items-center gap-4">
                    <p className='flex gap-2 text-lg text-gray-600'><Phone className='w-5 mt-1 h-5' /> {item.mobile}</p>
                    <p className='flex gap-2 text-lg text-gray-600'><Mail className='w-5 mt-1 h-5' /> {item.email}</p>
                </div>

                <p className='flex gap-2 text-lg text-gray-600'><Navigation className='w-5 mt-1 h-5' /> {item.landmark}</p>
                <p className='flex gap-2 text-lg text-gray-600'><Pin className='w-5 mt-1 h-5' />Pincode {item.pincode}</p>
                <div className="flex items-center gap-4">
                    <p className='flex gap-2 text-lg text-gray-600'><Building2 className='w-5 mt-1 h-5' /> {item.city}, {item.state}</p>
                    <p className='flex gap-2 text-lg text-gray-600'><Earth className='w-5 mt-1 h-5' /> {item.country}</p>

                </div>
                <div className="flex gap-2 mt-2 border-t border-gray-200 py-4">
                    <button className='flex items-center gap-2  cursor-pointer bg-emerald-800/10 border border-emerald-800/20 text-emerald-800  rounded-xl  px-3 py-2' onClick={() => handleEditClick(item)}><FilePenLine className='w-5 mb-1 h-5' /> Edit</button>
                    <button className='flex items-center gap-2 cursor-pointer bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl  px-3 py-2' onClick={() => handleDelete(item._id)}><Trash className='w-5 mb-1 h-5' /> Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Address_Card