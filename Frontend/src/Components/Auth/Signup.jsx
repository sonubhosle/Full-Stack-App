import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, Mail, Phone, UserCircle, UserRound } from 'lucide-react';
import FileUpload from './FileUpload ';

const Signup = ({ switchForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (auth.error) toast.error(auth.error);
  }, [auth.error]);

  useEffect(() => {
    if (auth.jwt) {
      toast.success('Sign up successful!');
      navigate('/');
    }
  }, [auth.jwt, navigate]);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters and include a capital letter, number, and symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = new FormData(e.currentTarget);
    const userData = {
      name: data.get('name'),
      surname: data.get('surname'),
      mobile: data.get('mobile'),
      password,
      confirmPassword,
      email: data.get('email'),
      photo: data.get('photo') ? data.get('photo') : null,
    };

    dispatch(register(userData));
  };

  return (
    <div className="flex-1 w-full  p-8 ">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="mb-7">
          <h1 className="text-3xl font-extrabold text-emerald-700 mb-2">Sign Up</h1>
          <p className="text-gray-600 text-lg">Create your account to get started.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <p className="text-gray-800 mb-1">Name</p>
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="w-full  border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <UserRound
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          <div className="relative">
            <p className="text-gray-800 mb-1">Surname</p>
            <div className="relative">
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Enter Your Surname"
                className="w-full  border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <UserCircle
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          <div className="relative">
            <p className="text-gray-800 mb-1">Mobile</p>
            <div className="relative">
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter Number"
                className="w-full  border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <Phone
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* 📧 Email Field */}
          <div className="relative">
            <p className="text-gray-800 mb-1">Email</p>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                className="w-full border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <Mail
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">

          {/* Password */}
          <div className="relative">
            <p className="text-gray-800 mb-1">Password</p>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-10 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <p className="text-gray-800 mb-1">Confirm Password</p>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-10 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>


          {/* Profile Photo */}
          <div className="col-span-2">
            <FileUpload
              label="Profile Photo"
              name="photo"
              onFileChange={(file) => setFormValues({ ...formValues, photo: file })}
            />

          </div>
        </div>

        <button
          type="submit"
          className="w-full text-[18px] cursor-pointer font-semibold py-2 bg-gradient-to-r from-gray-800 to-gray-950 text-white rounded-lg transition duration-300 hover:from-gray-950 hover:to-gray-800 mt-4"
        >
          Signup Now
        </button>

        <p className="text-lg  text-gray-500 text-center mt-3">
          Already have an account?
          <button
            type="button"
            onClick={switchForm}
            className="text-emerald-600 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
