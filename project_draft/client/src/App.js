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
    <Route exact path='/' element={<Home />}></Route>
    <Route exact path='/allLocations' element={<AllLocations />}></Route>
    <Route exact path='/locationSearch' element={<LocationSearch />}></Route>
    <Route exact path='/about' element={<About />}></Route>
    <Route exact path='/modeling' element={<Model />}></Route>
    <Route exact path='/feedback' element={<FeedbackForm />}></Route>
  </Routes>
);;

export default App;