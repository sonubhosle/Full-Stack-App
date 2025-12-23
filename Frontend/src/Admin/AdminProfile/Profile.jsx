import { User, Mail, Phone, MapPin, Lock, Bell, Globe, Save, Camera, UserRound, ChevronDown } from 'lucide-react';
import AdminHeading from '../AdminHeading/AdminHeading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '../../State/Authentication/Action';
import { AnimatePresence,motion } from 'framer-motion';

export default function AdminProfile() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const auth = useSelector((state) => state.auth);
  const user = auth.user;


  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    mobile: '',
    photo: null,
    role: '',
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        mobile: user.mobile || '',
        photo: null,
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateProfile(formData, jwt));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  // Dropdown selection
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setDropdownOpen(false);
  };


  return (
    <div className="p-4 ">
      <AdminHeading heading={'Profile Settings'} subheading={'Manage your account settings and preferences'} />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img src={user?.photo || '/default-avatar.png'} alt={user.name} className="object-cover object-top w-32 h-32 overflow-hidden p-[2px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                </img>
                <label htmlFor="photo-upload" className="absolute cursor-pointer bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors border-2 border-slate-100">
                  <Camera size={18} className="text-slate-600" />
                </label>
                <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{user.name} {user.surname}</h2>
              <p className="text-slate-600 text-sm mb-2">{user.email}</p>
              <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-medium rounded-full">
                Administrator
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Admin since</span>
                <span className="text-sm font-semibold text-slate-900">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <p className="text-gray-800 mb-1">Name</p>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                  />
                  <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                </div>
              </div>
              <div className="relative">
                <p className="text-gray-800 mb-1">Surname</p>
                <div className="relative">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Enter your surname"
                    className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                  />
                  <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                </div>
              </div>
  <div className="relative">
                        <p className="text-gray-800 mb-1">Email</p>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                            />
                            <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                    </div>

                    <div className="relative">
                        <p className="text-gray-800 mb-1">Mobile Number</p>
                        <div className="relative">
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your number"
                                className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                            />
                            <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                    </div>

                 <div className="relative w-64">
                    <p className="text-gray-800 mb-1">Role</p>
                    <div
                        className="border-2 border-gray-200 rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <span>{formData.role || 'Select role'}</span>
                        <ChevronDown size={20} className="text-gray-500" />
                    </div>

                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute w-full bg-white border-2 border-gray-200 rounded-lg mt-1 shadow-lg z-50 overflow-hidden"
                            >
                                {['USER', 'ADMIN'].map((role) => (
                                    <div
                                        key={role}
                                        className="px-4 py-2 hover:bg-emerald-100 cursor-pointer"
                                        onClick={() => handleRoleSelect(role)}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
          </div>



          <div className="flex flex-col sm:flex-row gap-4">
            <button type='submit' className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Save size={20} />
              Save Changes
            </button>
            <button className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
