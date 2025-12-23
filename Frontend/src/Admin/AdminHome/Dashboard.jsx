import { TrendingUp, ShoppingBag, UserCheck, DollarSign, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import Orders from '../AdminOrders/AdminOrders';
import AdminHeading from '../AdminHeading/AdminHeading';

const Dashboard =()  =>{

  

  return (
    <div className="p-4 space-y-6 lg:space-y-8">
      <AdminHeading heading={'Dashboard Overview'} subheading={"Welcome back! Here's what's happening with your business today."} />
    

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
                  { label: 'Active Users', value: '2,345', change: '+12.5%', icon: Activity, color: 'from-blue-500 to-cyan-600' },
                  { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: ShoppingBag, color: 'from-violet-500 to-purple-600' },
                  { label: 'Growth', value: '34.2%', change: '+4.3%', icon: TrendingUp, color: 'from-orange-500 to-red-600' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <span className="text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              <Orders/>
             
    </div>
  );
}

export default Dashboard