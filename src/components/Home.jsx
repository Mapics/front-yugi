import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  // State variables to manage the component's state
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortPriceOrder, setSortPriceOrder] = useState('ASC');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [alphabeticalSort, setAlphabeticalSort] = useState(false);
  const cardsPerPage = 27;

  // Navigation hook for programmatic navigation
  const navigate = useNavigate();

  // Fetch cards from the server based on the current filters and page
  useEffect(() => {
    const fetchCards = async () => {
      // Constructing query parameters for the API request
      const params = new URLSearchParams({
        page: currentPage,
        limit: cardsPerPage,
        name: searchTerm,
        type: filterType,
        rarity: selectedRarity,
        sortPrice: sortPriceOrder
      });
      
      // Adding an additional parameter for alphabetical sorting if enabled
      if (alphabeticalSort) {
        params.append('sortAlphabetical', 'ASC');
      }

      try {
        // Making a GET request to the server's API
        const res = await axios.get(`http://localhost:3001/cartes?${params.toString()}`);
        setCards(res.data);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    };

    // Calling the fetchCards function when the dependencies change
    fetchCards();
  }, [currentPage, searchTerm, filterType, selectedRarity, sortPriceOrder, alphabeticalSort]);

  // Handler for clicking the "Previous" button
  const handlePreviousClick = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  // Handler for clicking the "Next" button
  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handler for toggling alphabetical sorting
  const toggleAlphabeticalSort = () => {
    setAlphabeticalSort(!alphabeticalSort);
  };

  // Handler for changing the selected rarity filter
  const handleRarityChange = (e) => {
    setSelectedRarity(e.target.value);
  };

  // Handler for changing the selected price order
  const handlePriceOrderChange = (e) => {
    setSortPriceOrder(e.target.value);
  };

  // Navigate to the detailed view of a card
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
          <button className='btn' onClick={toggleAlphabeticalSort}>
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
