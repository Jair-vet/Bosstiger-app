import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
 
export const App = () => {
  return (
    <div>
      <Navbar />

      <main className='container md:pt-28 pt-48'>
        <h1>Welcome</h1>
      </main>

      <Footer />
      
    </div>
  )
}