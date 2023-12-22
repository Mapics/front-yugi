import React, { useState } from 'react';
import './inscription.css';

// SignUpForm component
const SignUpForm = () => {
  // State variables for managing form inputs
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Event handler for form submission
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Making a POST request to the server's API for user registration
      const response = await fetch('http://localhost:3001/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Sending user registration data in the request body
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      });

      // Parsing the response data
      const data = await response.json();

      // Handling the response data
      if (response.ok) {
        // Displaying a success message if registration is successful
        alert(data);
      } else {
        // Displaying an error message if registration fails
        alert(data.error);
      }
    } catch (error) {
      // Handling errors related to the API request
      console.error('Erreur lors de la requête API:', error);
    }
  };

  return (
    <div className='div'>
      <h1>Inscription</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="pseudo">Pseudo:</label>
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <br />
        <label htmlFor="motDePasse">Mot de passe:</label>
        <input
          type="password"
          id="motDePasse"
          name="motDePasse"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
