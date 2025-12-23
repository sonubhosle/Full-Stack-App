import { Navigation } from 'lucide-react'

const Newsletter = () => {
    return (
        <div className='w-full h-90 px-5 py-10'>
            <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img src="https://i.postimg.cc/Zn0xyd0f/01.jpg" alt="" className='w-full h-full object-cover' />
                <div className="absolute top-0 left-0 bg-gray-900/60  flex items-center justify-center flex-col  w-full h-full">
                    <div className="space-y-2 text-center">
                        <p className='text-white font-extrabold text-4xl'> Get <span className='text-amber-300'>20%</span> Off Discount Coupon</p>
                        <span className='text-gray-200 text-[20px]'>By Subscribe Our Newsletter</span>
                    </div>
                    <div className="mt-5 bg-white rounded-full py-3 px-4 flex items-center justify-between shadow-md max-w-xl w-full mx-auto">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="flex-1 px-4 py-2 text-[20px]  outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        />
                        <button className="relative cursor-pointer  bg-gray-900 text-white px-8 py-3 rounded-full font-semibold overflow-hidden group">
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 scale-0 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></span>
                            <span className="relative z-10 flex gap-2 items-center">Subscribe <Navigation /> </span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Newsletter