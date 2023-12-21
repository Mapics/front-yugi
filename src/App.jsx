import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './components/connexion/connexion';
import CarteInfo from './components/cartes/CarteInfo';
import CarteEdit from './components/cartes/CarteEdit';

function App() {
  return (
      <div className="App">
        <header className="header">
        <div className="header-top">
          <h1>Yu-Gi-Oh</h1>
          </div>
          </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/carteInfo/:id" element={<CarteInfo />} />
          <Route path="/carteEdit/:id" element={<CarteEdit />} />
        </Routes>
      </div>
  );
}

export default App;