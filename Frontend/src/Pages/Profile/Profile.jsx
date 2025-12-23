import { useState, useEffect } from 'react';
import Address from './Address';
import Account from './Account';
import Orders from '../Orders/Orders';
import PasswordUpdate from './PasswordUpdate';
import Wishlist from '../Wishlist/Wishlist';
import {
  LayoutDashboard,
  UserRound,
  ShoppingBag,
  Heart,
  LockKeyhole,
  MapPinned,
} from 'lucide-react';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

const Profile = () => {
  // Load active tab from localStorage or default to 'account'
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem('activeTab') || 'account'
  );

  // Save active tab to localStorage
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Display names
  const tabDisplayNames = {
    account: 'Account',
    orders: 'Orders',
    wishlist: 'Wishlist',
    address: 'Manage Address',
    'password Manager': 'Password Manager',
  };

  // Icons for each tab
  const tabIcons = {
    account: <UserRound size={20} />,
    orders: <ShoppingBag size={20} />,
    wishlist: <Heart size={20} />,
    address: <MapPinned size={20} />,
    'password Manager': <LockKeyhole size={20} />,
  };

  // Render content for active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <Account />;
      case 'orders':
        return <Orders />;
      case 'wishlist':
        return <Wishlist />;
      case 'address':
        return <Address />;
      case 'password Manager':
        return <PasswordUpdate />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="py-3 w-full px-2 border-b border-gray-200 bg-white">
         <Breadcrumb />
      </div>

      <div className="w-full flex gap-5">
        {/* Sidebar */}
        <div className="flex flex-col w-60 h-screen bg-white border-r border-gray-200">
          {['account', 'orders', 'wishlist', 'password Manager', 'address'].map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <div
                  key={tab}
                  className={`cursor-pointer font-semibold text-[16px] px-5 py-3 flex items-center gap-3 transition-all duration-300
                    ${isActive
                      ? 'text-emerald-800 bg-emerald-800/10  border-emerald-800'
                      : 'text-gray-700 hover:text-emerald-700'}
                  `}
                  onClick={() => handleTabClick(tab)}
                >
                  {tabIcons[tab]}
                  {tabDisplayNames[tab]}
                </div>
              );
            }
          )}
        </div>

        {/* Main Content */}
        <div className="content_area flex-1 p-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
