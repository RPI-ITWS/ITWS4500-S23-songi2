import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import Navigationbar from './components/Navbar'; 
import MatchInfo from './components/MatchInfo';
import TeamData from './components/TeamData';
import VisualData from './components/Visualization';

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
    <Route exact path="/node/" element={<HomePage />} />
    <Route exact path="/node/matchinfo" element={<MatchInfo />} />
    <Route exact path="/node/teamdata" element={<TeamData />} />
    <Route exact path="/node/visualdata" element={<VisualData />} />
  </Routes>
)

export default App
