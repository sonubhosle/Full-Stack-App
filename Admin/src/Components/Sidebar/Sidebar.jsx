import React from 'react';
import '../../Styles/Sidebar.css'
import { TbSettings2 } from 'react-icons/tb';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { RiHome3Line } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { FaUser, FaRegUser } from 'react-icons/fa';
import { MdOutlineEventNote } from 'react-icons/md';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

    return (
        <>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="logo_details">
                    <FaBars onClick={toggleSidebar} id='btn' />
                    <Link to="/" className="flex gap-3 items-center">
                        <p className="w-14 h-14 p-1 border border-gray-200 bg-gray-50 rounded-xl flex items-center justify-center">
                            <img src="https://i.postimg.cc/tCrxv0H3/shop-like.png" alt="logo" className="w-full h-full object-contain" />
                        </p>
                        <div class="hidden sm:block">
                            <p class="text-3xl font-extrabold text-gray-900">Sprazo</p>
                            <span class="text-gray-600 text-[15px]">Smart Shopping</span>
                        </div>
                    </Link>
                </div>

                <div className="nav-list">
                    <div className="heading"> <p></p> <span>Main</span></div>
                    <Link to='/' className='menu'>
                        <div className="icon"><MdOutlineDashboard /></div>
                        <div className="link-name"> Dashboard</div>
                    </Link>

                    <div className="heading"> <p></p> <span>Pages</span></div>
                    <Link to='/' className="menu padding">
                        <div className="icon"><RiHome3Line /></div>
                        <div className="link-name">Home</div>
                    </Link>
                    <Link to='/admin/customers' className="menu padding">
                        <div className="icon"><FaRegUser /></div>
                        <div className="link-name">Customers</div>
                    </Link>
                    <Link to='/admin/products' className="menu padding">
                        <div className="icon"><GiClothes /></div>
                        <div className="link-name">Products</div>
                    </Link>
                    <Link to='/admin/orders' className="menu padding">
                        <div className="icon"><MdOutlineEventNote /></div>
                        <div className="link-name">Orders</div>
                    </Link>
                    <Link to='/admin/create' className="menu padding">
                        <div className="icon"><FaRegPlusSquare /></div>
                        <div className="link-name">Create </div>
                    </Link>
                </div>
            </div>
        </>


    );
};

export default Sidebar;