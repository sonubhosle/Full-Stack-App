
import { ChevronsRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export const Button = ({ path, title }) => {
    const navigate = useNavigate()

    return (

        <button onClick={() => navigate(path)} className="group relative cursor-pointer  overflow-hidden rounded-sm bg-gradient-to-r from-emerald-600 to-emerald-800 px-5 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-400/0 to-emerald-300/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
            <div className="relative flex items-center justify-center gap-3">
                <span className="text-lg font-semibold tracking-wide">{title}</span>
                <ChevronsRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-all duration-500 group-hover:scale-150"></div>
        </button>
    )
}
