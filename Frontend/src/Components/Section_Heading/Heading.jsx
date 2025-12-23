import React from 'react'

const Heading = ({heading,headingcolor,subtitle,desc,icon}) => {
    return (
        <div className="mb-5 leading-tight ">
            <div className="flex gap-2">
                <h1 className='text-2xl font-semibold flex gap-2 items-center'>{icon}{heading}</h1>
                <h1 className='text-2xl capitalize font-semibold text-emerald-800 hover:text-gray-900 transition duration-200'>{headingcolor}</h1>
            </div>
            <p className='mt-1  text-xl font-semibold'>{subtitle}</p>
        </div>
    )
}

export default Heading