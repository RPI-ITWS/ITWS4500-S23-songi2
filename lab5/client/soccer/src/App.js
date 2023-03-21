import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import Navigationbar from './components/Navbar'; 
import MatchInfo from './components/MatchInfo';

const App = () => {
  return (
    <Router>
      <Navigationbar/>
      <Main />
    </Router>
  )
}
const Main = () => (
  <Routes>
    <Route exact path="/" element={<HomePage />} />
    <Route exact path="/matchinfo" element={<MatchInfo />} />
    {/* <Route exact path="/matchhistory" element= */}
  </Routes>
)

export default App
