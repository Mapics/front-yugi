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

  const handleEditClick = () => {
    // Redirigez l'utilisateur vers la page d'édition
    navigate(`/carteEdit/${id}`);
  };

  const handleDeleteClick = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('Utilisateur non autorisé');
        return;
      }

      await axios.delete(`http://localhost:3001/cartes/${id}`, {
        headers: {
          Authorization: `Bearer ${userId}`
        },
      });

      // Redirigez l'utilisateur vers la page d'accueil après la suppression
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte', error);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!card) {
    return <div className="loading">Chargement...</div>;
  }

  // Vérifiez si l'utilisateur est connecté
  const isUserLoggedIn = !!localStorage.getItem('userId');

  return (
    <div className="container">
       
      <div className="card-display">
        
        <div className="card-image-container">
          <img src={card.image_url} alt={card.nom} />
        </div>
          <div className="card-info">
       <h1> {card.name}</h1>
      <p>Type: {card.type}</p>
      <p>Race: {card.race}</p>
      
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
      {isUserLoggedIn && (
        <>
          <button onClick={handleEditClick}>Modifier la carte</button>
          <button onClick={handleDeleteClick}>Supprimer la carte</button>
        </>
      )}
    </div>
  );
}
