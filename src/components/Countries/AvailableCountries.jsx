"use client";
import React from 'react';
import '@/css/Countries/AvailableCountries.css'; 

const AvailableCountries = ({ countries }) => {
    const addNewProduct = () => {
        window.location.href = '/countries/country-form';
    }

    return (
      <div className="countries-container">
        <div className="header-container">
          <h2>Available Countries</h2>
          <div className="header-buttons">
            <button type='button' className="add-country-btn" onClick={addNewProduct} >Add new country</button>
          </div>
        </div>
        <div className="countries-grid">
          {countries.map((country, index) => (
            <div key={index} className="country-card">
              <div className="country-flag">
                <img src={country.flagUrl} alt={`${country.name} flag`} />
              </div>
              <div className="country-details">
                <p className="country-name">{country.countryName} / {country.cityName}</p>
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
