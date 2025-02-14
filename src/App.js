import React from 'react';
import './design.css'

import Nav from './Nav.jsx'
import HomeCard from './homeCard'
import TicketForm from './ticketForm'
import AttendeeForm from './attendeeForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
 
  return (
    <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<HomeCard />} />
      <Route path="/ticketForm" element={<TicketForm />} />
      <Route path="/attendeeForm" element={<AttendeeForm />} />
    </Routes>
  </Router>
  );
}

export default App;
