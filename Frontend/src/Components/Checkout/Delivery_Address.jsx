
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Address_Card from '../Address/Address_Card';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../State/Orders/Action';
import axios from 'axios'
import { Building2, Earth, Mail, MapPinPlus, Phone, Pin, UserRound } from 'lucide-react';

const Delivery_Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const userId = auth?.user?._id;
  const jwt = localStorage.getItem("jwt");

  // Fetching User Addresses

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/addresses/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setAddresses(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId && jwt) {
      fetchAddresses();
    }
  }, [userId, jwt]);


  const handleAddressSelect = (e) => {
    setSelectedAddress(JSON.parse(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let address;
    if (selectedAddress) {
      address = selectedAddress;
    } else {
      const data = new FormData(e.currentTarget);
      address = {
        name: data.get('name'),
        surname: data.get('surname'),
        landmark: data.get('address'),
        city: data.get('city'),
        state: data.get('state'),
        pincode: data.get('pincode'),
        mobile: data.get('mobile'),
        email: data.get('email'),
        country: data.get('country')
      };
    }

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div className='mb-15'>
      <div className='py-5 w-full' >
        <h1 className='flex items-center gap-2 text-2xl font-semibold text-gray-600'><MapPinPlus /> Select Address</h1>
        <p></p>
      </div>
      {addresses.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {addresses.map((addr, index) => (
            <Address_Card addr={addr} index={index} dispatch={dispatch} selectedAddress={selectedAddress} handleAddressSelect={handleAddressSelect} navigate={navigate} />
          ))}
        </div>
      )}

      <div className='mt-5'>
        <div className='py-5 w-full' >
          <h1 className='flex items-center gap-2 text-2xl font-semibold text-gray-600'><MapPinPlus /> Fill Address</h1>
          <p></p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className="grid grid-cols-3 gap-5">
            <div className="relative">
              <p className="text-gray-800 mb-1">Name</p>
              <div className="relative">
                <input type="text" id='name' name='name' placeholder='Enter your first name' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">Surname</p>
              <div className="relative">
                <input type="text" id='surname' name='surname' placeholder='Enter Your Last Name' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <UserRound size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">Mobile Number</p>
              <div className="relative">
                <input type="text" id='mobile' name='mobile' placeholder='Enter Your Number' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
              <div className="relative">
              <p className="text-gray-800 mb-1">Mail</p>
              <div className="relative">
                <input type="email" id='email' name='email' placeholder='Enter Your Email' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">City</p>
              <div className="relative">
                <input type="text" id='city' name='city' placeholder='Enter Your City' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">State</p>
              <div className="relative">
                <input type="text" id='state' name='state' placeholder='Enter Your State' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Building2 size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>

          </div>
          <div className="grid grid-cols-3 gap-5">
                      <div className="relative">
              <p className="text-gray-800 mb-1">Country</p>
              <div className="relative">
                <input type="text" id='country' name='country' placeholder='Enter Your Country' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Earth size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">Zip Code/Postal Code</p>
              <div className="relative">
                <input type="text" id='pincode' name='pincode' placeholder='Enter Your Pincode' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <Pin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
            <div className="relative">
              <p className="text-gray-800 mb-1">Address</p>
              <div className="relative">
                <input type="text" id='address' name='address' placeholder='Enter Your Address' disabled={!!selectedAddress}
                  className="w-full bg-white border-2 border-gray-200 outline-none rounded-lg text-[17px] pl-12 pr-4 py-2 focus:border-emerald-700 transition ease-in duration-300 placeholder-emerald-700"
                />
                <MapPinPlus size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-700" />
              </div>
            </div>
          </div>

          <button type='submit' className="mt-6 cursor-pointer bg-gradient-to-br from-emerald-700 to-emerald-900 text-white text-lg px-5 py-2 rounded-sm">
            Deliver Here
          </button>
        </form>
      </div>


    </div>
  );
};

export default Delivery_Address;
