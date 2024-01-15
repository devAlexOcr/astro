import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Naviguation/Header.jsx';
import Home from './pages/Home.jsx';
import Messier from './pages/Messier.jsx';
import ObjetMessier from './pages/ObjetMessier.jsx';
import Users from './pages/Users.jsx';
import Error from './pages/404.jsx';

import './rooter.css'



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/messier' element={<Messier />} />
        <Route path='/messier/:id' element={<ObjetMessier />} />
        <Route path='/login' element={<Users />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  
)
