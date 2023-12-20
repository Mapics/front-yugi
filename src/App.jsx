import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Connexion from './components/connexion/connexion';
import CarteInfo from './components/cartes/CarteInfo';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/cartes/:id" element={<CarteInfo />} />
        </Routes>
      </div>
  );
}

export default App;