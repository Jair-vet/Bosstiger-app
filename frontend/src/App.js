import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './screens/HomePage';
import { ProductScreen } from './screens/ProductScreen';
 
const App = () => {
  return (
    <div>
      <Navbar />

      <main className='container md:pt-28 pt-48'>
        <Routes>
              <Route path='/' element={ <HomePage />} exact />
              <Route path='/product/:id' element={ <ProductScreen />} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  )
}

export default App;