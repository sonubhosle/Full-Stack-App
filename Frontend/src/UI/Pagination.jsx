import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Pagination({ current = 2, total = 6, onPageChange }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  const canPrev = current > 1
  const canNext = current < total

  return (
    <nav className="mt-8 flex " aria-label="Pagination">
      <ul className="flex items-center gap-2  w-full  py-3">
        {/* Previous Button */}
        <li>
          <button
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full border border-gray-300 text-gray-600 hover:text-white hover:bg-emerald-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange?.(current - 1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </li>

        {/* Animated Page Numbers */}
        <AnimatePresence mode="wait">
          {pages.map((p) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <button
                aria-current={p === current ? "page" : undefined}
                className={[
                  "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium border transition-all duration-200",
                  p === current
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md scale-105"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-emerald-600 hover:text-emerald-700",
                ].join(" ")}
                onClick={() => onPageChange?.(p)}
              >
                {p}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>

        {/* Next Button */}
        <li>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:text-white hover:bg-emerald-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => canNext && onPageChange?.(current + 1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
