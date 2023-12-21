import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortPriceOrder, setSortPriceOrder] = useState('ASC');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [alphabeticalSort, setAlphabeticalSort] = useState(false);
  const cardsPerPage = 20;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: cardsPerPage,
        name: searchTerm,
        type: filterType,
        rarity: selectedRarity,
        sortPrice: sortPriceOrder
      });
      if (alphabeticalSort) {
        params.append('sortAlphabetical', 'ASC');
      }

      try {
        const res = await axios.get(`http://localhost:3001/cartes?${params.toString()}`);
        setCards(res.data);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    };

    fetchCards();
  }, [currentPage, searchTerm, filterType, selectedRarity, sortPriceOrder, alphabeticalSort]);

  const handlePreviousClick = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const toggleAlphabeticalSort = () => {
    setAlphabeticalSort(!alphabeticalSort);
  };

  const handleRarityChange = (e) => {
    setSelectedRarity(e.target.value);
  };

  const handlePriceOrderChange = (e) => {
    setSortPriceOrder(e.target.value);
  };

  const showCardDetails = (cardId) => {
    navigate(`/carteInfo/${cardId}`);
  };

  return (
    <div className="page">
      
          <div className="search-area">
            <div className="input-wrapper">
              <input
                type="text"
                className="input-box"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <span className="underline"></span>
            </div>
          </div>
        
        <div className="controls-area">
          <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Monster Card">Monster Cards</option>
            <option value="Spell Card">Spell Cards</option>
            <option value="Trap Card">Trap Cards</option>
          </select>
          <button onClick={toggleAlphabeticalSort}>
            Sort A-Z {alphabeticalSort ? 'On' : 'Off'}
          </button>
          <select className="rarity-select" value={selectedRarity} onChange={handleRarityChange}>
            <option value="">All Rarities</option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Super Rare">Super Rare</option>
            <option value="Ultra Rare">Ultra Rare</option>
            
          </select>
          <select className="price-order-select" value={sortPriceOrder} onChange={handlePriceOrderChange}>
            <option value="ASC">Price Low-High</option>
            <option value="DESC">Price High-Low</option>
          </select>
        </div>
      
      <main className="main-content">
        <div className="cards-grid">
          {cards.map(card => (
             <div className="card" key={card.id} onClick={() => showCardDetails(card.id)}>
              <img src={card.image_url} alt={card.nom} />
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePreviousClick}>Previous</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </main>

    </div>
  );
}
