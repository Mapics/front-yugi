import React, { useState } from 'react';

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/utilisateurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  };

  return (
    <div>
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
