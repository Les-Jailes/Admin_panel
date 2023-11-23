import React from "react";
import "@/css/Countries/CountryForm.css";

const CountryForm = () => {
  return (
    <div className="form-container">
      <div className="form-title">CREATE NEW COUNTRY</div>
      <div className="form-body">
        <div className="input-group">
          <label htmlFor="country-name">Country name</label>
          <input type="text" id="country-name" />
        </div>
        <div className="input-group">
          <label htmlFor="city-name">City name</label>
          <input type="text" id="city-name" />
        </div>
        <div className="input-group">
          <label htmlFor="tax">Tax</label>
          <input type="text" id="tax" />
        </div>
        <div className="input-group">
          <label htmlFor="telephone-code">Telephone code</label>
          <input type="text" id="telephone-code" />
        </div>
        <div className="subcities-title">Subcities</div>
        <div className="subcities">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Zip code" />
        </div>
        <button className="subcity-btn">Add a new subcity</button>
        <div className="form-footer">
          <button className="create-btn">Create</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CountryForm;
