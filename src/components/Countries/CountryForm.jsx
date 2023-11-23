"use client";
import React, { useState } from "react";
import "@/css/Countries/CountryForm.css";
import Swal from "sweetalert2";

const CountryForm = () => {
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [tax, setTax] = useState("");
  const [telephoneCode, setTelephoneCode] = useState("");
  const [subcityName, setSubcityName] = useState("");
  const [zipCode, setZipCode] = useState("");

  const validateLettersOnly = (input) => /^[A-Za-z]+$/.test(input);
  const validateFirstLetterCapital = (input) => /^[A-Z][a-z]*$/.test(input);
  const validateNumbersOnly = (input) => /^[0-9]+$/.test(input);
  const validateInteger = (input) => /^[0-9]+$/.test(input);
  const hasDecimal = (input) => input.includes(".") || input.includes(",");

  const handleCountryChange = (e) => setCountryName(e.target.value);
  const handleCityChange = (e) => setCityName(e.target.value);
  const handleTaxChange = (e) => setTax(e.target.value);
  const handleTelephoneChange = (e) => setTelephoneCode(e.target.value);
  const handleSubcityChange = (e) => setSubcityName(e.target.value);
  const handleZipChange = (e) => setZipCode(e.target.value);

  const handleCreate = async (e) => {
    e.preventDefault();

    let errorMessage = "";
    if (!countryName) errorMessage = "Country name cannot be empty.";
    else if (!validateLettersOnly(countryName))
      errorMessage = "Country name can only contain letters.";

    if (!cityName) errorMessage = errorMessage || "City name cannot be empty.";
    else if (!validateLettersOnly(cityName))
      errorMessage = errorMessage || "City name can only contain letters.";
    else if (!validateFirstLetterCapital(cityName))
      errorMessage =
        errorMessage || "City name must start with a capital letter.";

    if (!tax) errorMessage = errorMessage || "Tax cannot be empty.";
    else if (hasDecimal(tax))
      errorMessage =
        errorMessage || "Please round the tax amount to a whole number.";
    else if (!validateInteger(tax))
      errorMessage = errorMessage || "Tax can only contain whole numbers.";

    if (!telephoneCode)
      errorMessage = errorMessage || "Telephone code cannot be empty.";
    else if (!validateNumbersOnly(telephoneCode))
      errorMessage = errorMessage || "Telephone code can only contain numbers.";

    if (!subcityName)
      errorMessage = errorMessage || "Subcity name cannot be empty.";
    else if (!validateLettersOnly(subcityName))
      errorMessage = errorMessage || "Subcity name can only contain letters.";
    else if (!validateFirstLetterCapital(subcityName))
      errorMessage =
        errorMessage || "Subcity name must start with a capital letter.";

    if (!zipCode) errorMessage = errorMessage || "Zip code cannot be empty.";
    else if (!validateNumbersOnly(zipCode))
      errorMessage = errorMessage || "Zip code can only contain numbers.";

    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      const isValidCountry = Array.isArray(data) && data.length > 0;

      if (isValidCountry) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Country created successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Country is not valid.",
        });
      }
    } catch (error) {
      console.error("There was an error validating the country:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error validating the country.",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">CREATE NEW COUNTRY</div>
      <form className="form-body" onSubmit={handleCreate}>
        <div className="input-group">
          <label htmlFor="country-name">Country name</label>
          <input
            type="text"
            id="country-name"
            value={countryName}
            onChange={handleCountryChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="city-name">City name</label>
          <input
            type="text"
            id="city-name"
            value={cityName}
            onChange={handleCityChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="tax">Tax</label>
          <input type="text" id="tax" value={tax} onChange={handleTaxChange} />
        </div>
        <div className="input-group">
          <label htmlFor="telephone-code">Telephone code</label>
          <input
            type="text"
            id="telephone-code"
            value={telephoneCode}
            onChange={handleTelephoneChange}
          />
        </div>
        <div className="subcities-title">Subcities</div>
        <div className="subcities">
          <input
            type="text"
            placeholder="Name"
            value={subcityName}
            onChange={handleSubcityChange}
          />
          <input
            type="text"
            placeholder="Zip code"
            value={zipCode}
            onChange={handleZipChange}
          />
        </div>
        <button className="subcity-btn">Add a new subcity</button>
        <div className="form-footer">
          <button type="submit" className="create-btn">
            Create
          </button>
          <button type="button" className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
