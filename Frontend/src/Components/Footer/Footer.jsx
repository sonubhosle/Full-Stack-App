import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, CreditCard, Shield, Truck, Award, Store } from 'lucide-react';
import {Link} from 'react-router-dom'
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900  to-gray-950 text-white">
      <div className=" px-5  py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
          <Link to='/' className="flex group gap-3 items-center">
                   <p className='flex items-center justify-center rounded-xl w-15 h-15 p-2   border border-[#F2C94C]  transition ease-in duration-200  ' >
                     <img className='w-full h-full object-contain' src="https://i.postimg.cc/0NZskb3Z/icon.png" alt="logo" />
                   </p>
                   <div className="">
                     <p className='text-3xl font-extrabold text-gray-200 transition ease-in-out duration-200'>Sprazo</p>
                     <span className='text-gray-400'>Smart Shopping</span>
                   </div>
                 </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Your premier destination for quality products and exceptional shopping experiences. Discover the difference with ShopHub.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 transition-all duration-200 hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 transition-all duration-200 hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 transition-all duration-200 hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 transition-all duration-200 hover:scale-110">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Shop All', 'New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-lg flex items-center group">
                    <span className="w-0 h-0 group-hover:w-2.5 group-hover:h-2.5 rounded-full bg-emerald-700 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {['Contact Us', 'Shipping Info', 'Returns', 'Track Order', 'Size Guide', 'FAQs'].map((link) => (
                <li key={link}>
                   <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-lg flex items-center group">
                    <span className="w-0 h-0 group-hover:w-2.5 group-hover:h-2.5 rounded-full bg-emerald-700 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-slate-400">123 Commerce Street, Suite 100, India, 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="text-emerald-400 flex-shrink-0" size={18} />
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="text-purple-400 flex-shrink-0" size={18} />
                <span className="text-slate-400">support@shophub.com</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="px-5 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-lg text-center md:text-left">
              © {currentYear} ShopHub. All rights reserved. Designed with excellence.
            </div>
            <div className="flex items-center space-x-4 text-lg text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
}

export default Footer;