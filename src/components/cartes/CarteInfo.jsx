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
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Utilisateur non autorisé');
      return;
    }
    navigate(`/carteEdit/${id}`);
  };
  

  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token manquant');
        return;
      }

      await axios.delete(`http://localhost:3001/cartes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
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
  const isUserLoggedIn = !!localStorage.getItem('token');
  console.log('Token:', localStorage.getItem('token'));


  return (
    <div className="card-info-container">
      <div className="info-container">
      <div className="card-image">
        <img src={card.image_url} alt={card.nom} />
      </div>
      <div className="card-details">
        <h1>{card.nom}</h1>
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
        <div className="card-actions">
          <button onClick={handleClose}>Fermer</button>
          {isUserLoggedIn && (
            <>
              <button onClick={handleEditClick}>Modifier la carte</button>
              <button onClick={handleDeleteClick}>Supprimer la carte</button>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}