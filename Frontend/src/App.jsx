import React, { Suspense, lazy, useEffect } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './Components/Loader/Loader';
const Footer = lazy(() => import('./Components/Footer/Footer'));
const Rating_Reviews = lazy(() => import('./Components/Rating_Reviews/Rating_Reviews'));
const Checkout = lazy(() => import('./Components/Checkout/Checkout'));
const Order_Details = lazy(() => import('./Pages/Orders/Order_Details'));
const Filtered_Products = lazy(() => import('./Components/Products/Filtered_Products'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
import Payments from './Components/Payment/Payments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Components/Navbar/Navigation';
import ProductNotification from './Components/Products/ProductNotification';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ProductHero from './Pages/Product/ProductHero';
import SearchResults from './Components/Search/SearchResults';
import NotFound from './Components/NotFound/NotFound';
import Wishlist from './Pages/Wishlist/Wishlist';
import AdminRoute from './Admin/Routes/AdminRoutes';
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/AdminHome/Dashboard';
import AdminOrders from './Admin/AdminOrders/AdminOrders';
import AdminProducts from './Admin/AdminProducts/AdminProducts';
import Users from './Admin/AdminUsers/UsersList';
import AdminProfile from './Admin/AdminProfile/Profile';
import AdminUpdate from './Admin/AdminProducts/AdminUpdate';
const App = () => {

  
  const location = useLocation()
 

  const hideNavFooter = location.pathname.startsWith('/admin');


  return (
    <Suspense fallback={<Loader />}>
      {!hideNavFooter && <Navigation />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/products/:name" element={<Filtered_Products />} />
        <Route path='/product/:productId' element={<ProductHero />} />
        <Route path='/product/:productId/reviews-ratings' element={<Rating_Reviews />} />
        <Route path='/checkout/' element={<Checkout />} />
        <Route path='/account/order/:orderId' element={<Order_Details />} />
        <Route path='/payments/:orderId' element={<Payments />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
            <Route path="products">
    <Route index element={<AdminProducts />} />
    <Route path=":productId" element={<AdminUpdate />} />
  </Route>
  
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<AdminProfile  />} />
        </Route>
      </Routes>
      {!hideNavFooter && <Footer />}

      <ProductNotification />
      < ToastContainer />
    </Suspense>
  )
}

export default App