import React, { useState, useEffect } from 'react';
import SvgIcon from '../SvgIcon';
import { searchCities } from '../../services/weatherService';

const SearchPage = ({ onClose, onAddLocation, citiesCount = 0, onOpenList }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const cities = await searchCities(query);
        setResults(cities);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (city) => {
    onAddLocation(city);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  if (citiesCount >= 9) {
    return (
      <div className="search-page">

        <div className="limit-state-container">
                      <div className="skyki-logo">
                        <SvgIcon name="skyki" className="logo-mark" />
                        SKYKI
                      </div>
          <div className="limit-text">
            You cannot add more than 9 locations. Please go to the list page and delete existing locations.
          </div>
          
                <div className='buttons-box'>
          <button className="add-location-btn"  onClick={onOpenList} >
            Open List Page
            <SvgIcon name="hum2" />
          </button>

          <button className="add-location-btn secondary"  onClick={onClose} >
            Back
            <SvgIcon name="back" />
          </button>
          </div>


        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <form className="search-input-wrapper" onSubmit={handleSubmit}>
          <SvgIcon name="search" className="icon-input" />
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            
              <SvgIcon name="clear" className="icon-input clear" onClick={() => setQuery('')}/>
          
          )}
        </form>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>

      <div className="search-results">
        {loading ? (
          <div className="search-message">Searching...</div>
        ) : results.length > 0 ? (
          <ul className="results-list">
            {results.map((city, index) => (
              <li key={`${city.latitude}-${city.longitude}-${index}`} onClick={() => handleSelect(city)}>             
                <div className="result-info">
                  <span className="result-name">{city.name}</span>
                  <span className="result-detail">
                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                  </span>
                </div>
              <SvgIcon name="add"  className="icon-input" />

              </li>
            ))}
          </ul>
        ) : query.length >= 3 ? (
          <div className="search-message">No results found</div>
        ) : (
          <div className="search-message">
            Type at least 3 characters to search
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
