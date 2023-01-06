import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import NoMatch from './pages/NoMatch';
import Warehouses from './pages/Warehouses';
import Booking from "./pages/Booking";


function App() {

  return (
    <div className="text-[#1a3066]">
      <Routes>
        <Route path="/" element={<Warehouses />} />
        <Route path="/warehouses/:id/bookings" element={<Booking />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}

export default App
