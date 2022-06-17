import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}
//store.getState().auth.user
export default App;
