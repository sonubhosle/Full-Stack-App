import { ChevronRight, ChevronsRight } from 'lucide-react'
import React from 'react'

const Banner = () => {
  return (
    <div className='w-full  px-5 py-10'>
      <div className="w-full rounded-xl overflow-hidden relative">
        <img src="https://i.postimg.cc/9f3g5J0K/big-banner.jpg" alt="" className='w-full' />
        <div className="absolute space-y-5  flex items-center justify-center flex-col top-0 left-0  w-full h-full">
          <p className='text-gray-900 text-4xl font-extrabold'>Mega Collections</p>
          <h1 className='text-3xl tracking-widest font-extrabold text-indigo-900 uppercase'>Huge Sale Up To 40% Off</h1>
          <div className="space-y-1">
            <div className=" w-full mx-auto h-[1px] bg-gray-600"></div>
            <p className='text-2xl text-gray-800'>at our outlet stores</p>
            <div className=" w-full mx-auto h-[1px] bg-gray-600"></div>
          </div>
          <button className="relative cursor-pointer  bg-gray-900 text-white px-8 py-3 rounded-full font-semibold overflow-hidden group">
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 scale-0 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 flex gap-2 items-center">Shop Now <ChevronsRight className='transition ease-in duration-200 transform group-hover:translate-x-1 ' /> </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner