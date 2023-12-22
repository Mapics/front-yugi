import React from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './components/connexion/connexion';
import CarteInfo from './components/cartes/CarteInfo';
import CarteEdit from './components/cartes/CarteEdit';
import logo from './img/yugi.png';
import './App.css';
import Inscription from './components/inscription/inscription';

function App() {
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for user logout
  const handleLogout = () => {
    // Removing user-related items from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Navigating to the home page after logout
    navigate('/');
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-top">
          <Link to="/">
            <img src={logo} alt="Logo" /> 
          </Link>
          {localStorage.getItem('token') && (
            <button onClick={handleLogout}>Déconnexion</button>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/carteInfo/:id" element={<CarteInfo />} />
        <Route path="/carteEdit/:id" element={<CarteEdit />} />
      </Routes>
    </div>
  );
}

export default App;
