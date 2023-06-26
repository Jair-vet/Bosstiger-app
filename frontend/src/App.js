import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './screens/HomePage';
 
const App = () => {
  return (
    <div>
      <Navbar />

      <main className='container md:pt-28 pt-48'>
          <HomePage />
      </main>

      <Footer />
      
    </div>
  )
}

export default App;