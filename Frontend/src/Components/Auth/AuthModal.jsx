import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { AnimatePresence,motion } from "framer-motion";
import { X } from "lucide-react";

const AuthModal = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 w-full"
      />

      <motion.div
        key="modal"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed z-50 inset-0 flex items-center justify-center p-4"
      >
        <div
          className="bg-white  w-full max-w-2xl rounded-lg shadow-lg  relative overflow-hidden"
          onClick={(e) => e.stopPropagation()} // prevent overlay click
        >
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-3 right-4 bg-gray-200 rounded-full px-2 py-2 text-gray-800 hover:rotate-90 transition-transform duration-300 text-2xl"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Form content */}
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {isLogin ? (
              <Login switchForm={() => setIsLogin(false)} onLogin={onLogin} />
            ) : (
              <Signup switchForm={() => setIsLogin(true)} />
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default AuthModal;