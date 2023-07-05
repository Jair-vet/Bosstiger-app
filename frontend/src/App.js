import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './screens/HomePage';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { LoginScreen } from './screens/LoginScreen';

 
const App = () => {
  return (
    <>
      <Navbar />

        <div className='md:pt-0 pt-36 overflow-x-hidden h-screen'>
          <Routes>
                <Route path='/' element={ <HomePage />} exact />
                <Route path='/product/:id' element={ <ProductScreen />} />
                <Route path='/cart' element={ <CartScreen />} />
                <Route path='/login' element={ <LoginScreen />} />
          </Routes>
        </div>

      <Footer />
      
    </>
  )
}

export default App;