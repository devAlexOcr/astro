import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home.jsx';
import Messier from './pages/Messier.jsx';
import Users from './pages/Users.jsx';

import './rooter.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/messier' element={<Messier />} />
        <Route path='/login' element={<Users />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
