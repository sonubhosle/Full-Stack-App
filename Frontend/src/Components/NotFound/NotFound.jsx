import React from 'react';
import {  Home, Zap } from 'lucide-react';


const NotFound = () => {

    return (
        <div className='relative w-full  flex  items-center  justify-center overflow-hidden  '>


            {/* Main Content */}
            <div className='relative z-10 w-150 max-w-2xl mx-auto py-10  text-center'>
                {/* Glass Card Effect */}
                <div className=' bg-white rounded-3xl p-6 '>

                    {/* 404 Heading */}
                    <h1 className='text-6xl sm:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-red-400  to-pink-400 bg-clip-text text-transparent '>
                        404
                    </h1>
                    {/* Title */}
                    <div className="">
                      
                            <div className="inline-flex mb-4 capitalize font-semibold items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
                               <Zap className="text-red-400 w-5 h-5"  />

                                <span className="text-red-400 text-lg font-semibold">Not Found</span>
                            </div>
                       
                    </div>

                    {/* Action buttons */}
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-4 sm:mb-12 px-4'>
                        <button onClick={() => navigate('/')}
                            className='group px-5 p-2 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 font-semibold bg-gray-100  hover:shadow-xl transition-all'
                        >
                            <Home className='w-4 h-4 mr-2 group-hover:rotate-12 transition-transform' />
                            Go Home
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
