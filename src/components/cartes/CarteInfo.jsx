import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CarteInfo.css'

export default function CarteInfo() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

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
    </div>
  );
}
