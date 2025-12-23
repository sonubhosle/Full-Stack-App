import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../State/Authentication/Action";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }
    if (auth.message) {
      toast.success(auth.message);
      navigate("/"); 
    }
  }, [auth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    dispatch(resetPassword(token, password, confirmPassword));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-emerald-700 mb-4">Reset Password</h1>
        <p className="text-gray-600 mb-6">Enter your new password below.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-800 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none hover:border-emerald-600 transition duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none hover:border-emerald-600 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-semibold rounded-lg hover:from-gray-950 hover:to-gray-800 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
