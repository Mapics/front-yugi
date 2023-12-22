import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarteInfo.css';

export default function CarteInfo() {
  // State variable to store card details
  const [card, setCard] = useState(null);
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Fetching card details when the component mounts or when 'id' changes
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        console.log(`Fetching card details for ID: ${id}`);
        // Making a GET request to the server's API to fetch card details
        const res = await axios.get(`http://localhost:3001/cartes/${id}`);
        console.log('Response:', res.data);
        // Setting the retrieved card details in the state
        setCard(res.data);
      } catch (error) {
        console.error("Error fetching card details", error);
      }
    };

    // Calling the fetchCardDetails function
    fetchCardDetails();
  }, [id]);

  // Handler for clicking the "Modifier la carte" button
  const handleEditClick = () => {
    // Checking if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Utilisateur non autorisé');
      return;
    }
    // Navigating to the card editing page
    navigate(`/carteEdit/${id}`);
  };

  // Handler for clicking the "Supprimer la carte" button
  const handleDeleteClick = async () => {
    try {
      // Retrieving the user token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token manquant');
        return;
      }

      // Making a DELETE request to the server's API to delete the card
      await axios.delete(`http://localhost:3001/cartes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      // Navigating back to the home page after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la suppression de la carte', error);
    }
  };

  // Handler for clicking the "Fermer" button
  const handleClose = () => {
    // Navigating back to the home page
    navigate("/");
  };

  // Checking if the card details are still being fetched
  if (!card) {
    return <div className="loading">Chargement...</div>;
  }

  // Checking if the user is logged in
  const isUserLoggedIn = !!localStorage.getItem('token');
  console.log('Token:', localStorage.getItem('token'));

  const renderCardDetail = (label, value, isUrl) => {
    return value ? (
      <p>
        <strong>{label}:</strong> {isUrl ? <a href={value} target="_blank" rel="noopener noreferrer">Plus d'informations</a> : value}
      </p>
    ) : null;
  };
  
  return (
    <div className="card-info-container">
      <div className="info-container">
        <div className="card-image">
          {card.image_url && <img src={card.image_url} alt={card.nom} />}
        </div>
        <div className="card-details">
          <h1>{card.nom}</h1>
          {renderCardDetail('Type', card.type)}
          {renderCardDetail('Race', card.race)}
          {renderCardDetail('Archetype', card.archetype)}
          {renderCardDetail('Set Name', card.set_name)}
          {renderCardDetail('Set Code', card.set_code)}
          {renderCardDetail('Set Rarity', card.set_rarity)}
          {renderCardDetail('Set Price', card.set_price)}
          {renderCardDetail('Cardmarket Price', card.cardmarket_price)}
          {renderCardDetail('eBay Price', card.ebay_price)}
          {renderCardDetail('Amazon Price', card.amazon_price)}
          {renderCardDetail('CoolStuffInc Price', card.coolstuffinc_price)}
          {renderCardDetail('', card.ygoprodeck_url, true)} {/* URL as a clickable link */}

          {card.type === "Spell Card" || card.type === "Trap Card" ? (
            <>
              {renderCardDetail('Frame Type', card.frameType)}
              {renderCardDetail('Description', card.description)}
            </>
          ) : (
            <>
              {renderCardDetail('ATK', card.atk)}
              {renderCardDetail('DEF', card.def)}
              {renderCardDetail('Level', card.level)}
              {renderCardDetail('Attribute', card.attribute)}
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
  );
}