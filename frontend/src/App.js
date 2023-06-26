import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
 
const App = () => {
  return (
    <div>
      <Navbar />

      <main className='container md:pt-28 pt-48'>
          <Outlet />
      </main>

      <Footer />
      
    </div>
  )
}

export default App;