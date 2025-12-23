import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react'

import { useNavigate } from 'react-router-dom';
import Heading from '../Section_Heading/Heading';
import { categories } from '../Data/categories';



const Categories = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-50 py-10 px-5">
      <Heading heading={'Top '} subtitle={'Categories'} headingcolor={'Categories'} icon={<LayoutDashboard />} />
      <section className="relative">
        <Swiper
          modules={[Navigation, Keyboard]}
          slidesPerView="auto"
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          keyboard={{ enabled: true }}
          loop

        >
          {categories.map((item) => (
            <SwiperSlide
              key={item.name}
              style={{ width: "150px", flexShrink: 0 }}
              className='py-6 pl-2'
            >
              <div key={item.name} onClick={() => navigate(`/products/${item.name}`)} className="py-3 group duration-300  relative bg-white border border-gray-200 rounded-[10px] flex items-center justify-center flex-col gap-5  cursor-pointer hover:shadow-xl hover:border-emerald-800 transition ease-in ">
                <img src={item.poster} alt={item.name} className="w-15 h-15 bg-gray-200 object-contain rounded-full" />
                <p className='text-sm capitalize font-semibold text-gray-700 group-hover:text-emerald-800  transition'>{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Prev Button */}
        <button
          className="custom-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer border border-gray-200 bg-white text-gray-700 w-13 h-13 rounded-full flex items-center justify-center shadow-lg "
          aria-label="Previous slide">
          <ChevronLeft />

        </button>

        {/* Custom Next Button */}
        <button
          className="custom-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer border border-gray-200 bg-white text-gray-700 w-13 h-13 rounded-full flex items-center justify-center shadow-lg "
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </section>
    </div>

  )
}

export default Categories