import React from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './components/connexion/connexion';
import CarteInfo from './components/cartes/CarteInfo';
import CarteEdit from './components/cartes/CarteEdit';
import Inscription from './components/inscription/inscription';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-top">
          <h1>Yu-Gi-Oh</h1>
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
