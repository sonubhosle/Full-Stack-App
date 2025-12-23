import React from 'react'
import { Zap } from 'lucide-react'

const Heading = ({heading,subtitle,icon}) => {
    return (
        <div className='py-5 px-5 w-full' >
            <h1 className='flex items-center gap-2 text-2xl font-semibold text-gray-600'>{icon} {heading}</h1>
             <p>{subtitle}</p>
        </div>
    )
}

export default Heading