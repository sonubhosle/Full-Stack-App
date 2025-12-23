import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home.jsx';
import Header from './Components/Header/Header.jsx';
import Login from './Components/Admin_Auth/Admin_Login.jsx';
import Signup from './Components/Admin_Auth/Admin_Signup.jsx';
import ProtectedRoute from './Components/Protected/Protected.jsx';
import { getUser } from './State/Admin_Auth/Action.js';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Products from './Pages/Products/Products.jsx';
// import Orders from './Pages/Orders/Orders.jsx';
import Admin_Profile from './Pages/Admin_Profile/Admin_Profile.jsx';
import Customers from './Pages/Customers/Customers.jsx';
import Update_Product from './Pages/Update_Product/Update_Product.jsx';
import CreateProduct from './Pages/Create_Product/CreateProduct.jsx';
const AppContent = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwt);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hideSidebarAndHeader = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div>
      {!hideSidebarAndHeader && (
        <>
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Header />
        </>
      )}
      <div className={`main-content ${isSidebarOpen ? 'open' : 'closed'}`}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<ProtectedRoute element={<Home />} />} />
          <Route path='/admin/products' element={<ProtectedRoute element={<Products />} />} />
          {/* <Route path='/admin/orders' element={<ProtectedRoute element={<Orders />} />} /> */}
          <Route path='/admin/create' element={<ProtectedRoute element={<CreateProduct />} />} />
          <Route path='/admin/profile' element={<ProtectedRoute element={<Admin_Profile />} />} />
          <Route path='/admin/customers' element={<ProtectedRoute element={<Customers />} />} />
          <Route path='/admin/update/product/:id' element={<ProtectedRoute element={<Update_Product />} />} />
          <Route path='/create' element={<CreateProduct/>}/>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
