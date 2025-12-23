import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipboardList, PartyPopper } from 'lucide-react';

const Payments = () => {
const [confetti, setConfetti] = useState([])
const { orderId } = useParams()
const navigate = useNavigate()
  useEffect(() => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
    }))
    setConfetti(particles)
  }, [])




    return (
     
       <div className="relative h-screen w-full overflow-hidden  flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 ">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-300/40 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-in fade-out duration-1000"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            animation: `fall 2s ease-in forwards`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Icon with multiple animation layers */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-lg opacity-0 animate-in fade-in duration-1000" />

          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-2xl animate-in zoom-in duration-700">
              <PartyPopper size={48} className="text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Text content with staggered animations */}
        <div className="text-center space-y-3 animate-in slide-in-from-bottom-8 duration-700 delay-200">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Payment Success
          </h2>
          <p className="text-lg text-emerald-700">Congratulations, your order is placed!</p>
        </div>


        <div className="mt-4 text-sm bg-emerald-600/10 px-4 py-2 rounded-xl border border-emerald-400 text-emerald-600 animate-in fade-in duration-1000 delay-500">
        ORDER ID : {orderId}
        </div>
           <button onClick={() => navigate('/account/orders')} className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:shadow-xl hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          <ClipboardList size={20} />
          Go Orders
        </button>
      </div>


       </div>

    )
}

export default Payments;
