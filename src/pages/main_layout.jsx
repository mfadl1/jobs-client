import React from 'react'
import Navbar from '../components/navbar';

function MainLayout({children}) {
    return (
    <>
    <Navbar />
    {children}
    </>
    );
  }
  
  export default MainLayout;