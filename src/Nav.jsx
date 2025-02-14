import React from 'react';
import './index.css'
const Nav = () =>{
    return (
            <div className='flex justify-center'>
    <nav className="border rounded-xl bg-[#0e464f] text-white py-4 px-6 flex items-center justify-between w-5/6">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full">
          <span className="text-xl font-bold">S</span>
        </div>
        <span className="text-lg font-semibold">Stanz</span>
      </div>


      <div className="hidden md:flex space-x-6">
        <a
          href="#events"
          className="hover:text-primary transition-colors duration-300">Events</a>
        <a
          href="#my-tickets"
          className="hover:text-primary transition-colors duration-300">My Tickets
        </a>
        <a
          href="#about-project"
          className="hover:text-primary transition-colors duration-300">About Project
        </a>
      </div>


      <div>
        <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
          MY TICKETS →
        </button>
      </div>

      <div className="md:hidden">
        <button className="text-white focus:outline-none">☰</button>
      </div>
    </nav>
    </div>
    );
};
export default Nav;