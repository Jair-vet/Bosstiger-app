import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './screens/HomePage';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { LoginScreen } from './screens/LoginScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterScreen } from './screens/RegisterScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { PrivateRoute } from './components/PrivateRoute';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceOrderScreen } from './screens/PlaceOrderScreen';
import { OrderScreen } from './screens/OrderScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminRoute } from './components/AdminRoute';
import { OrderListScreen } from './screens/admin/OrderListScreen';
import { ProductListScreen } from './screens/admin/ProductListScreen';
import { ProductEditScreen } from './screens/admin/ProductEditScreen';
import { UserListScreen } from './screens/admin/UserListScreen';
import { UserEditScreen } from './screens/admin/UserEditScreen';



const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />

        <div className='md:pt-0 pt-36 overflow-x-hidden h-screen'>
          <Routes>
                <Route index={true} path='/' element={ <HomePage />} exact />
                <Route path='/search/:keyword' element={ <HomePage />} />
                <Route path='/page/:pageNumber' element={ <HomePage />} />
                <Route path='/search/:keyword/page/:pageNumber' element={ <HomePage />} />
                <Route path='/product/:id' element={ <ProductScreen />} />
                <Route path='/cart' element={ <CartScreen />} />
                <Route path='/login' element={ <LoginScreen />} />
                <Route path='/register' element={ <RegisterScreen />} />

                {/* Private Route */}
                <Route path='' element={ <PrivateRoute />} >
                  <Route path='/shipping' element={ <ShippingScreen />} />
                  <Route path='/payment' element={ <PaymentScreen />} />
                  <Route path='/placeorder' element={ <PlaceOrderScreen />} />
                  <Route path='/order/:id' element={ <OrderScreen />} />
                  <Route path='/profile' element={ <ProfileScreen /> } />
                </Route>

                {/* Admin Route */}
                <Route path='' element={ <AdminRoute />} >
                  <Route path='/admin/orderlist' element={ <OrderListScreen />} />
                  <Route path='/admin/productlist' element={ <ProductListScreen />} />
                  <Route path='/admin/productlist/:pageNumber' element={ <ProductListScreen />} />
                  <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

                </Route>
          </Routes>
        </div>

      <Footer />
      
    </>
  )
}

export default App;