import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Liked from './pages/Liked';
import FullPost from './pages/FullPost';

function App() {
  return (
    <Router>
      <Routes>
        {/* auth routes */}
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        {/* protected routes */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='/liked' element={<Liked/>} />

        {/* unprotected routes */}
        <Route path='/post/:id' element={<FullPost/>} />

      </Routes>
    </Router>
  );
}
//store.getState().auth.user
export default App;
