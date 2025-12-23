import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../State/Authentication/Action';
import { toast } from 'react-toastify';
import { ChevronRight,  Mail, } from 'lucide-react';

const PasswordUpdate = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth.error) toast.error(auth.error);
    if (auth.message) toast.success(auth.message);
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    dispatch(forgotPassword(email));
  };

  return (

      <form className="space-y-3 px-2 py-5" onSubmit={handleSubmit}>


        <div className="grid grid-cols-4 gap-10">
          <div className="relative col-span-2">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-emerald-700 mb-2">Forgot Password</h1>
              <p className="text-gray-600 text-lg">Enter your email to receive a reset link.</p>
            </div>
            <p className="text-gray-800 mb-1">Email</p>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
              />
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
            </div>
            <button
              type="submit"
              className="w-full mt-5 py-2 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-semibold rounded-lg hover:from-gray-950 hover:to-gray-800 transition"
            >
              Send Reset Link
            </button>
          </div>
          <div className="col-span-2  mb-6">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold text-emerald-700 mb-2">How it works</h1>
              <p className="text-gray-600 text-lg">Proccess</p>

            </div>
            <ul className=" space-y-3">
              <li className='bg-white text-gray-700 rounded-xl px-4 py-2 flex items-center gap-2'><ChevronRight className='w-4 h-4' /> Enter the email address associated with your account.</li>
              <li className='bg-white text-gray-700 rounded-xl px-4 py-2 flex items-center gap-2'><ChevronRight className='w-4 h-4' /> We will send a secure password reset link to your email.</li>
              <li className='bg-white text-gray-700 rounded-xl px-4 py-2 flex items-center gap-2'><ChevronRight className='w-4 h-4' /> Click the link to set a new password.</li>
              <li className='bg-white text-gray-700 rounded-xl px-4 py-2 flex items-center gap-2'><ChevronRight className='w-4 h-4' /> The link is valid for 1 hour only.</li>
            </ul>
          </div>

        </div>

      </form>

  );
};

export default PasswordUpdate;
