import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './connexion.css';

const LoginForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  // Event handler for form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Making a POST request to the server's API for user authentication
      const response = await fetch('http://localhost:3001/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      });

      // Parsing the response data
      const data = await response.json();

      // Handling the response data
      if (data.success) {
        // Displaying a success message, saving the token to localStorage, and navigating to the home page
        alert(data.message);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        // Displaying an error message if authentication fails
        alert(data.message);
      }
    } catch (error) {
      // Handling errors related to the API request
      console.error('Erreur lors de la requête API:', error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1>Connexion</h1>
          <div className="input-group">
            <label htmlFor="pseudo">Pseudo:</label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="motDePasse">Mot de passe:</label>
            <input
              type="password"
              id="motDePasse"
              name="mot_de_passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <div className="login-buttons">
            <button type="submit" className="login-button">Se connecter</button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
