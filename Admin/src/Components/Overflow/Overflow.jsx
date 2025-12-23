import React from 'react'
import '../../Styles/Overview.css'
import { FaArrowTrendUp, FaEllipsisVertical, FaRupeeSign, FaUser } from 'react-icons/fa6'
import { GoTrophy } from "react-icons/go";

const sales_data = [
    {
        stats: '245k',
        title: "Sales",
        color: "primary",
        icon: <FaArrowTrendUp />
    },
    {
        stats: '22.5k',
        title: "Customers",
        color: "success",
        icon: <FaUser />
    },
    {
        stats: '500k',
        title: "Products",
        color: "warning",
        icon: <FaArrowTrendUp />
    },
    {
        stats: '500k',
        title: "Revenue",
        color: "info",
        icon: <FaRupeeSign />
    },
]


const getColorStyle = (color) => {
    switch (color) {
        case 'info':
            return { backgroundColor: '#17a2b8', color: 'white' };
        case 'success':
            return { backgroundColor: '#28a745', color: 'white' };
        case 'warning':
            return { backgroundColor: '#ffc107', color: 'black' };
        case 'primary':
            return { backgroundColor: '#dc3545', color: 'white' };
        default:
            return { backgroundColor: '#f8f9fa', color: 'black' }; // default or unknown color
    }
};




const Overflow = () => {
    return (
        <div className='overflow-grid'>
            <div className="product-overview">
                <h2>Welcome!</h2>
                <span>Admin</span>
                <div className='p'>100k Products</div>
                <div className="trophy"> <GoTrophy size={100} /></div>
                <div className="view-product">View</div>
            </div>
            <div className="revenu-overview">
                <div className="revenu-header">
                    <h2>Monthly Overview</h2>
                    <FaEllipsisVertical className='vertical-icons' size={20} color='#969696' />
                </div>
                <span>Total 48.5% Growth this month</span>
                <div className="boxes">
                    {sales_data.map((item, index) => (
                        <div key={index} className='status' >
                            <div className='icon-box' style={{ ...getColorStyle(item.color) }}>{item.icon}</div>
                            <div className='text-info'>
                                <p>{item.title}</p>
                                <span>{item.stats}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Overflow