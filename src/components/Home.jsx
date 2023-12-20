// Importez les modules nécessaires de React
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Définissez la fonction du composant
export default function CarteInfo({ match }) {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cartes/${match.params.id}`);
        setCard(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de la carte', error);
      }
    };

    fetchCard();
  }, [match.params.id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carte-info">
      <h1>{card.nom}</h1>
      <img src={card.image_url} alt={card.nom} />
      {/* Affichez les autres informations de la carte en fonction de votre modèle de données */}
      <p>Type: {card.type}</p>
      <p>Race: {card.race}</p>
      {/* Ajoutez d'autres informations ici */}
    </div>
  );
}
