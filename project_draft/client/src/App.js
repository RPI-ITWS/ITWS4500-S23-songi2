import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navigation from './Navigation.js'
import Home from './Home';
import About from './About';
import AllLocations from './AllLocations';
import LocationSearch from './locationSearch';
import Footer from './Footer';
import {Route, Routes } from 'react-router-dom';
import Model from './modeling'
import FeedbackForm from './feedback';

const App = () => (
  <div className='app'>
    <Navigation />
    <Main />
    <Footer />
    
  </div>
);

const Main = () => (
  <Routes>
    <Route exact path='/node/' element={<Home />}></Route>
    <Route exact path='/node/allLocations' element={<AllLocations />}></Route>
    <Route exact path='/node/locationSearch' element={<LocationSearch />}></Route>
    <Route exact path='/node/about' element={<About />}></Route>
    <Route exact path='/node/modeling' element={<Model />}></Route>
    <Route exact path='/node/feedback' element={<FeedbackForm />}></Route>
  </Routes>
);;

export default App;