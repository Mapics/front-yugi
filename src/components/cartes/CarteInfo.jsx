import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarteInfo.css';

export default function CarteInfo() {
  const [card, setCard] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        console.log(`Fetching card details for ID: ${id}`);
        const res = await axios.get(`http://localhost:3001/cartes/${id}`);
        console.log('Response:', res.data);
        setCard(res.data);
      } catch (error) {
        console.error("Error fetching card details", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleDeleteCard = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('Utilisateur non autorisé');
        return;
      }

      console.log('Attempting to delete card with ID:', id);

      const response = await axios.delete(`http://localhost:3001/cartes/${id}`, {
        headers: {
          Authorization: `Bearer ${userId}`
        },
      });

      console.log('Response:', response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte', error);
    }
  };

  if (!card) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="card-info-container">
      <h1>{card.nom}</h1>
      <img src={card.image_url} alt={card.nom} />
      <p>Type: {card.type}</p>
      <p>Race: {card.race}</p>
      <p>Set Name: {card.set_name}</p>
      <p>Set Rarity: {card.set_rarity}</p>
      {card.type === "Spell Card" || card.type === "Trap Card" ? (
        <>
          <p>Frame Type: {card.frame_type}</p>
          <p>Description: {card.description}</p>
        </>
      ) : (
        <>
          <p>ATK: {card.atk}</p>
          <p>DEF: {card.def}</p>
          <p>Level: {card.level}</p>
          <p>Attribute: {card.attribute}</p>
        </>
      )}
      
      {/* Bouton de suppression */}
      <button onClick={handleDeleteCard}>Supprimer la carte</button>
    </div>
  );
}
