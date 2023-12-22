import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarteEdit.css'

export default function CarteEdit() {
  const [card, setCard] = useState(null);
  const [editedCard, setEditedCard] = useState({
    nom: '',
    type: '',
    race: '',
    set_name: '',
    set_rarity: '',
    frame_type: '',
    description: '',
    atk: '',
    def: '',
    level: '',
    attribute: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        console.log(`Fetching card details for ID: ${id}`);
        const res = await axios.get(`http://localhost:3001/cartes/${id}`);
        console.log('Response:', res.data);
        setCard(res.data);
        setEditedCard(res.data);
      } catch (error) {
        console.error("Error fetching card details", error);
      }
    };

    fetchCardDetails();
  }, [id]);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Utilisateur non autorisé');
        navigate('/');
      }
    };

    checkAuthentication();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard({
      ...editedCard,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Utilisateur non autorisé');
        navigate('/connexion');
        return;
      }

      console.log('Attempting to update card with ID:', id);

      const response = await axios.put(`http://localhost:3001/cartes/${id}`, editedCard, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      console.log('Response:', response.data.message);
      navigate(`/carteInfo/${id}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte', error);
    }
  };

  if (!card) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="card-edit-container">
       <div className="image-container">
      <img src={editedCard.image_url} alt={`Image de ${editedCard.nom}`} />
    </div>
      <div className="form-container">
      <h1>Édition de la carte</h1>
      <label>Nom:
        <input type="text" name="nom" value={editedCard.nom} onChange={handleInputChange} />
      </label>
      <label>Type:
        <input type="text" name="type" value={editedCard.type} onChange={handleInputChange} />
      </label>
      <label>Race:
        <input type="text" name="race" value={editedCard.race} onChange={handleInputChange} />
      </label>
      <label>Set Name:
        <input type="text" name="set_name" value={editedCard.set_name} onChange={handleInputChange} />
      </label>
      <label>Set Rarity:
        <input type="text" name="set_rarity" value={editedCard.set_rarity} onChange={handleInputChange} />
      </label>
      {editedCard.type === "Spell Card" || editedCard.type === "Trap Card" ? (
        <>
          <label>Frame Type:
            <input type="text" name="frame_type" value={editedCard.frame_type} onChange={handleInputChange} />
          </label>
          <label>Description:
            <textarea name="description" value={editedCard.description} onChange={handleInputChange} />
          </label>
        </>
      ) : (
        <>
          <label>ATK:
            <input type="text" name="atk" value={editedCard.atk} onChange={handleInputChange} />
          </label>
          <label>DEF:
            <input type="text" name="def" value={editedCard.def} onChange={handleInputChange} />
          </label>
          <label>Level:
            <input type="text" name="level" value={editedCard.level} onChange={handleInputChange} />
          </label>
          <label>Attribute:
            <input type="text" name="attribute" value={editedCard.attribute} onChange={handleInputChange} />
          </label>
        </>
      )}
      <button className='btn' onClick={handleSaveChanges}>Enregistrer les modifications</button>
    </div>
   
    </div>
  );
}
