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
        const res = await axios.get(`http://localhost:3001/cartes/${id}`);
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

  const isUserLoggedIn = !!localStorage.getItem('token');

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