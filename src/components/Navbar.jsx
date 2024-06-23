import React from 'react';
import logo from '../images/Logo.png';

// Navbar component representing the website's navigation bar
export default function Navbar() {
  return (
    // Container div with styling for positioning and spacing
    <div className='w-40 ml-5 mb-2 mt-2'>
      {/* Logo image with alt text for accessibility */}
      <img src={logo} alt="logo" className='navlogo' />
    </div>
  );
}
