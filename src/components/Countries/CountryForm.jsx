"use client";
import React, { useState } from "react";
import "@/css/Countries/CountryForm.css";
import Swal from "sweetalert2";
import API from "../Api/api";

const CountryForm = () => {
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [tax, setTax] = useState("");
  const [telephoneCode, setTelephoneCode] = useState("");
  const [subcities, setSubcities] = useState([{ name: "", zipCode: "" }]);

  const validateLettersOnly = (input) => /^[A-Za-z]+$/.test(input);
  const validateFirstLetterCapital = (input) => /^[A-Z][a-z]*$/.test(input);
  const validateNumbersOnly = (input) => /^[0-9]+$/.test(input);
  const validateInteger = (input) => /^[0-9]+$/.test(input);
  const hasDecimal = (input) => input.includes(".") || input.includes(",");

  const handleCountryChange = (e) => setCountryName(e.target.value);
  const handleCityChange = (e) => setCityName(e.target.value);
  const handleTaxChange = (e) => setTax(e.target.value);
  const handleTelephoneChange = (e) => setTelephoneCode(e.target.value);

  const addSubcity = () => {
    setSubcities([...subcities, { name: "", zipCode: "" }]);
  };

  const handleSubcityChange = (index, key) => (e) => {
    const newSubcities = [...subcities];
    newSubcities[index][key] = e.target.value;
    setSubcities(newSubcities);
  };

  const removeSubcity = (index) => {
    const newSubcities = subcities.filter((_, i) => i !== index);
    setSubcities(newSubcities);
  };

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

    for (const [index, subcity] of subcities.entries()) {
      if (!subcity.name) {
        errorMessage = `Subcity #${index + 1} name cannot be empty.`;
        break;
      } else if (!validateLettersOnly(subcity.name)) {
        errorMessage = `Subcity #${index + 1} name can only contain letters.`;
        break;
      } else if (!validateFirstLetterCapital(subcity.name)) {
        errorMessage = `Subcity #${
          index + 1
        } name must start with a capital letter.`;
        break;
      }

      if (!subcity.zipCode) {
        errorMessage = `Subcity #${index + 1} zip code cannot be empty.`;
        break;
      } else if (!validateNumbersOnly(subcity.zipCode)) {
        errorMessage = `Subcity #${
          index + 1
        } zip code can only contain numbers.`;
        break;
      }
    }

    if (errorMessage) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      return;
    }

    const countryData = {
      countryName,
      cityName,
      tax: parseInt(tax, 10), 
      telephoneCode: `+${telephoneCode}`, 
      zipCodes: subcities.map((subcity) => ({
        subCityName: subcity.name,
        zipCode: subcity.zipCode,
      })),
    };

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      const isValidCountry = Array.isArray(data) && data.length > 0;

      console.log(isValidCountry)

      if (isValidCountry) {
        const response = await API.post("/Country", countryData);
        if (response.status === 200) {
          Swal.fire("Success", "Country created successfully!", "success");
        }
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
        {subcities.map((subcity, index) => (
          <div key={index} className="subcities">
            <input
              type="text"
              placeholder="Name"
              value={subcity.name}
              onChange={handleSubcityChange(index, "name")}
            />
            <input
              type="text"
              placeholder="Zip code"
              value={subcity.zipCode}
              onChange={handleSubcityChange(index, "zipCode")}
            />
            {subcities.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubcity(index)}
                className="remove-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="subcity-btn" onClick={addSubcity}>
          Add a new subcity
        </button>
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
