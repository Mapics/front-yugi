import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './components/connexion/connexion';
import CarteInfo from './components/cartes/CarteInfo';
import CarteEdit from './components/cartes/CarteEdit';
import Inscription from './components/inscription/inscription';

function App() {
  return (
      <div className="App">
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