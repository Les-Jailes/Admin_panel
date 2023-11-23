import React from 'react';
import '@/css/Countries/AvailableCountries.css'; 

const AvailableCountries = ({ countries }) => {
    return (
      <div className="countries-container">
        <h2>Available Countries</h2>
        <div className="countries-grid">
          {countries.map((country, index) => (
            <div key={index} className="country-card">
              <div className="country-flag">
                <img src={country.flagUrl} alt={`${country.name} flag`} />
              </div>
              <div className="country-details">
                <p className="country-name">{country.name} / {country.capital}</p>
                <div className="country-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default AvailableCountries;
