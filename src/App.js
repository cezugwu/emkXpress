import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import ProductProvider from './contexts/ProductContext';
import NotFound from './pages/NotFound';
import getRandomString from './contexts/RandomNumber';
import CartProvider from './contexts/CartContext';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import PrivateRoute from './utilis/PrivateRoute';
import CheckOut from './pages/CheckOut';
import AuthProvider from './contexts/AuthContext';
import UserPage from './pages/UserPage';
import UserProvider from './contexts/UserContext';
import Pending from './pages/Pending';
import PaymentProvider from './contexts/PaymentContext';
import Register from './pages/Register';
import ShippingInfoPage from './pages/ShippingInfoPage';
import UpdateShippingInfoPage from './pages/UpdateShippingInfo';
import FilterProvider from './contexts/FilterContext';
import SidebarProvider from './contexts/sidebarcontext';
import ProfileProvider from './contexts/profilecontext';
import HeaderProvider from './contexts/headercontext';
import Sidebar from './components/sidebar';
import ProfileMenu from './components/profilemenu';
import SearchPage from './pages/SearchPage';
import CountryProvider from './contexts/CountryContext';

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem('cart_code')) {
      localStorage.setItem('cart_code', getRandomString());
    } else {
      return;
    }
  }, []);


  return (
      <div className='overflow-hidden'>
          <CountryProvider>
          <UserProvider>
          <CartProvider>
          <AuthProvider>
          <PaymentProvider>
          <SidebarProvider>
          <ProductProvider>
          <ProfileProvider>
          <HeaderProvider>
          <FilterProvider>
            {!location.pathname.startsWith("/login") && !location.pathname.startsWith("/register") && <Header />}
            <Sidebar />
            <ProfileMenu />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='product/:slug' element={<ProductDetails />} />
                <Route path='*' element={<NotFound />} />
                <Route path='cart' element={<CartPage />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='checkout' element={<PrivateRoute element={CheckOut} />} />
                <Route path='user' element={<PrivateRoute element={UserPage} />} />
                <Route path='pending' element={<PrivateRoute element={Pending} />} />
                <Route path='shipping' element={<PrivateRoute element={ShippingInfoPage} />} />
                <Route path='updateshipping' element={<PrivateRoute element={UpdateShippingInfoPage} />} />
              </Routes>
          </FilterProvider>
          </HeaderProvider>
          </ProfileProvider>
          </ProductProvider>
          </SidebarProvider>
          </PaymentProvider>
          </AuthProvider>
          </CartProvider>
          </UserProvider>
          </CountryProvider>
      </div>
  );
};

export default App;
