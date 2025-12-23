import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, forgotPassword } from '../../State/Authentication/Action';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const Login = ({ switchForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

 useEffect(() => {
  if (auth.error) toast.error(auth.error);

  if (auth.jwt && auth.user) {
    toast.success('Login successful!');
    if (auth.user.role === 'ADMIN') {
      navigate('/admin/dashboard'); 
    } else {
      navigate('/'); 
    }
  }

  if (auth.message) toast.success(auth.message); 
}, [auth, navigate]);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(pass);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters and include a capital letter, number, and symbol."
      );
      return;
    }
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(login(userData));
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return toast.error("Please enter your email");
    dispatch(forgotPassword(forgotEmail));
  };

  return (

    <div className=" w-full  bg-white p-8">
      {!showForgot ? (
        <form className="space-y-3" onSubmit={handleLoginSubmit}>
          <div className="mb-7">
            <h1 className="text-3xl font-extrabold text-emerald-700 mb-2">Sign In</h1>
            <p className="text-gray-600 text-lg">Welcome back! Sign in to continue.</p>
          </div>

          <div className="relative">
            <p className="text-gray-800 mb-1">Email</p>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full  border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <Mail
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>



          <div className="relative">
            <p className="text-gray-800 mb-1">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full  border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-12 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              {/* Left lock icon */}
              <Lock
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              {/* Right show/hide button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot password link */}
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-emerald-600 mt-3 hover:underline"
            >
              Forgot Password?
            </button>
          </div>


          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-semibold rounded-lg hover:from-gray-950 hover:to-gray-800 transition"
          >
            Sign In
          </button>


            <p className="text-gray-500 text-center text-lg">
              Don’t have an account?{" "}
              <button type="button" onClick={switchForm} className="text-emerald-600 hover:underline">
                Sign up
              </button>
            </p>
        </form>
      ) : (
        <form className="space-y-3" onSubmit={handleForgotSubmit}>
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-emerald-700 mb-2">Forgot Password</h1>
            <p className="text-gray-600 text-lg">Enter your email to receive a reset link.</p>
          </div>

          <div>
            <p className="text-gray-800 mb-1">Email</p>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full border border-gray-200 outline-none rounded-lg px-4 py-2 hover:border-emerald-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-semibold rounded-lg hover:from-gray-950 hover:to-gray-800 transition"
          >
            Send Reset Link
          </button>

          <button
            type="button"
            onClick={() => setShowForgot(false)}
            className="mt-2 text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
