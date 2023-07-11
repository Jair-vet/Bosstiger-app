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


const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />

        <div className='md:pt-0 pt-36 overflow-x-hidden h-screen'>
          <Routes>
                <Route path='/' element={ <HomePage />} exact />
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
          </Routes>
        </div>

      <Footer />
      
    </>
  )
}

export default App;