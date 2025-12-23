import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, deleteAddress, updateAddress } from '../../State/Address/Action';
import { FilePenLine, Trash, UserRound, Phone, Mail, Zap, Pin, Navigation, Building2, Earth, X } from 'lucide-react';

const Address = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const auth = useSelector((state) => state.auth);
  const userId = auth.user?._id;

  const { addresses, loading } = useSelector((state) => state.address);

  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (jwt) dispatch(getAddresses(userId, jwt));
  }, [jwt, dispatch, userId]);

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setFormData({ ...address });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddress(editingAddress._id, formData, jwt));
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id, jwt));
  };

  if (loading) return <p>Loading...</p>;

  return (
   
      <div className="py-5 px-2">
        {addresses.length ? (
          <>
            {addresses.map((item) => (
              <div  key={item._id}>
                {editingAddress?._id === item._id ? (
                  <form onSubmit={handleUpdateSubmit} className='space-y-4'>
                    <div className="grid grid-cols-3 gap-5">
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Name</p>
                        <div className="relative">
                          <input type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="Update Your Name"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>

                      <div className="relative">
                        <p className="text-gray-800 mb-1">Surname</p>
                        <div className="relative">
                          <input type="text" name="surname" value={formData.surname} onChange={handleChange}
                            placeholder="Update Your Surname"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Mobile Number</p>
                        <div className="relative">
                          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange}
                            placeholder="Update Your Mobile Number"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Email</p>
                        <div className="relative">
                          <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="Update Your Email"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Pincode</p>
                        <div className="relative">
                          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                            placeholder="Update Your Pincode"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Pin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Landmark</p>
                        <div className="relative">
                          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
                            placeholder="Update Your Landmark"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Navigation size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      <div className="relative">
                        <p className="text-gray-800 mb-1">City</p>
                        <div className="relative">
                          <input type="text" name="city" value={formData.city} onChange={handleChange}
                            placeholder="Update Your City"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="text-gray-800 mb-1">State</p>
                        <div className="relative">
                          <input type="text" name="state" value={formData.state} onChange={handleChange}
                            placeholder="Update Your State"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                      <div className="relative">
                        <p className="text-gray-800 mb-1">Country</p>
                        <div className="relative">
                          <input type="text" name="country" value={formData.country} onChange={handleChange}
                            placeholder="Update Your Country"
                            className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                          />
                          <Earth size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
                        </div>
                      </div>
                    </div>
                      <div className="flex gap-2 mt-2 border-t border-gray-200 py-4">
                        <button className='flex items-center gap-2  cursor-pointer bg-emerald-800/10 border border-emerald-800/20 text-emerald-800  rounded-xl  px-3 py-2' type='submit'><FilePenLine className='w-5 mb-1 h-5' /> Save</button>
                        <button className='flex items-center gap-2 cursor-pointer bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl  px-3 py-2' onClick={() => setEditingAddress(null)}><X className='w-5 mb-1 h-5' /> Cancel</button>
                      </div>
                  </form>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 '>
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 space-y-3">
                      <p className='flex gap-2 text-lg text-gray-600'><UserRound className='w-5 mt-1 h-5' /> {item.name} {item.surname}</p>
                      <div className="flex items-center gap-4">
                        <p className='flex gap-2 text-lg text-gray-600'><Phone className='w-5 mt-1 h-5' /> {item.mobile}</p>
                        <p className='flex gap-2 text-lg text-gray-600'><Mail className='w-5 mt-1 h-5' /> {item.email}</p>
                      </div>

                      <p className='flex gap-2 text-lg text-gray-600'><Navigation className='w-5 mt-1 h-5' /> {item.landmark}</p>
                      <p className='flex gap-2 text-lg text-gray-600'><Pin className='w-5 mt-1 h-5' />Pincode {item.pincode}</p>
                      <div className="flex items-center gap-4">
                        <p className='flex gap-2 text-lg text-gray-600'><Building2 className='w-5 mt-1 h-5' /> {item.city}, {item.state}</p>
                        <p className='flex gap-2 text-lg text-gray-600'><Earth className='w-5 mt-1 h-5' /> {item.country}</p>

                      </div>
                      <div className="flex gap-2 mt-2 border-t border-gray-200 py-4">
                        <button className='flex items-center gap-2  cursor-pointer bg-emerald-800/10 border border-emerald-800/20 text-emerald-800  rounded-xl  px-3 py-2' onClick={() => handleEditClick(item)}><FilePenLine className='w-5 mb-1 h-5' /> Edit</button>
                        <button className='flex items-center gap-2 cursor-pointer bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl  px-3 py-2' onClick={() => handleDelete(item._id)}><Trash className='w-5 mb-1 h-5' /> Delete</button>
                      </div>
                    </div>
                  </div>
                  
                )}
              </div>
            ))}
          </>
        ) : (
          <p>No addresses found</p>
        )}
      </div>
   
  );
};

export default Address;
