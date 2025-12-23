import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateProfile } from '../../State/Authentication/Action';
import { Mail, Phone, UserRound, Edit2,  } from 'lucide-react';
import { toast } from 'react-toastify'

const Account = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const auth = useSelector((state) => state.auth);
    const user = auth.user;

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        mobile: '',
        photo: null,
    });

    // Populate form with current user info
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
            });
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file upload
    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            toast.success('Profile updated successfully!');
            dispatch(updateProfile(formData, jwt));

        } catch (error) {
            toast.error(error.message || 'Failed to update profile',);
        }
    };

    return (
      

            <div className='grid grid-cols-4 space-y-8 gap-10 px-2 py-5'>
                <form className="col-span-4 space-y-6" onSubmit={handleSubmit}>
                    {/* Profile Photo */}
                    <div className="flex items-center gap-5">
                        <div className="relative w-17 h-17">
                            <img
                                src={user?.photo || '/default-avatar.png'}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-2 border-emerald-700"
                            />
                            <label
                                htmlFor="photo-upload"
                                className="absolute bottom-0 right-0 bg-emerald-700 rounded-full p-2 cursor-pointer hover:bg-emerald-800"
                            >
                                <Edit2 size={18} color="white" />
                            </label>
                            <input
                                type="file"
                                id="photo-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Name & Surname */}
                    <div className="grid grid-cols-2 gap-5">
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
                    </div>

                    {/* Email & Mobile */}
                    <div className="grid grid-cols-2 gap-5">
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
                    </div>

                    <button
                        type='submit'
                        className='bg-gradient-to-r from-emerald-700 to-emerald-900 mt-5 text-white text-lg font-semibold px-5 py-2 rounded-sm cursor-pointer shadow-2xl hover:shadow-emerald-700 transition ease-in duration-300'
                    >
                        Update Profile
                    </button>
                </form>

          
            </div>
        
    );
};

export default Account;
