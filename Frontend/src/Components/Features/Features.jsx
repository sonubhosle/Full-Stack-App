import { Award, CreditCard, Shield, Truck } from 'lucide-react'


const Features = () => {
  return (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8 ">
            <div className="group flex items-center space-x-3 bg-white  rounded-xl px-5 py-5 border border-gray-200 hover:shadow-2xl transition ease-in duration-200 cursor-pointer">
              <div className="bg-indigo-800/10 rounded-full p-3">
                <Truck className="text-indigo-700 w-13 h-13"  />
              </div>
              <div>
                <p className="font-semibold text-[20px]  group-hover:text-indigo-700 transition ease-in duration-200">Free Shipping</p>
                <p className="text-lg text-gray-600">Orders over $50</p>
              </div>
            </div>

            <div className="group flex items-center space-x-3 bg-white  rounded-xl px-5 py-5 border border-gray-200 hover:shadow-2xl transition ease-in duration-200 cursor-pointer">
              <div className="bg-emerald-700/10 rounded-full p-3">
                <Shield className="text-emerald-700 w-13 h-13"  />
              </div>
              <div>
                <p className="font-semibold text-[20px] group-hover:text-emerald-700 transition ease-in duration-200">Secure Payment</p>
                <p className="text-lg text-gray-600">100% Protected</p>
              </div>
            </div>

            <div className="group flex items-center space-x-3 bg-white  rounded-xl px-5 py-5 border border-gray-200 hover:shadow-2xl transition ease-in duration-200 cursor-pointer">
              <div className="bg-purple-700/10 rounded-full p-3">
                <Award className="text-purple-700 w-13 h-13"  />
              </div>
              <div>
                <p className="font-semibold text-[20px] group-hover:text-purple-700 transition ease-in duration-200">Quality Assured</p>
                <p className="text-lg text-gray-600">Premium Products</p>
              </div>
            </div>

            <div className="group flex items-center space-x-3 bg-white  rounded-xl px-5 py-5 border border-gray-200 hover:shadow-2xl transition ease-in duration-200 cursor-pointer">
              <div className="bg-yellow-500/10 rounded-full p-3">
                <CreditCard className="text-yellow-500 w-13 h-13"  />
              </div>
              <div>
                <p className="font-semibold text-[20px] group-hover:text-yellow-500 transition ease-in duration-200">Easy Returns</p>
                <p className="text-lg text-gray-600">30 Days Policy</p>
              </div>
            </div>
          </div>
  )
}

export default Features

// https://i.postimg.cc/9f3g5J0K/big-banner.jpg
// https://i.postimg.cc/Zn0xyd0f/01.jpg
// https://i.postimg.cc/0NZskb3Z/icon.png