"use client";
import React, { useState, useEffect } from "react";
import "@/css/Countries/CountryForm.css";
import Swal from "sweetalert2";
import API from "../Api/api";
import axios from "axios";

const CountryForm = () => {
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [tax, setTax] = useState("");
  const [telephoneCode, setTelephoneCode] = useState("");
  const [subcities, setSubcities] = useState([{ name: "", zipCode: "" }]);
  const [isEditing, setIsEditing] = useState(false);

  const validateFirstLetterCapital = (input) => /^[A-Z][a-zA-Z ]*$/.test(input);
  const validateNumbersOnly = (input) => /^[0-9]+$/.test(input);
  const validateInteger = (input) => /^[0-9]+$/.test(input);
  const hasDecimal = (input) => input.includes(".") || input.includes(",");

  const handleCountryChange = (e) => setCountryName(e.target.value);
  const handleCityChange = (e) => setCityName(e.target.value);
  const handleTaxChange = (e) => setTax(e.target.value);
  const handleTelephoneChange = (e) => setTelephoneCode(e.target.value);

  useEffect(() => {
    const editCountry = JSON.parse(localStorage.getItem("editCountry"));
    if (editCountry) {
      setCountryName(editCountry.countryName);
      setCityName(editCountry.cityName);
      setTax(editCountry.tax.toString());
      const telephoneWithoutPlus = editCountry.telephoneCode.startsWith("+")
        ? editCountry.telephoneCode.substring(1)
        : editCountry.telephoneCode;
      setTelephoneCode(telephoneWithoutPlus);
      setSubcities(
        editCountry.zipCodes.map((subcity) => ({
          name: subcity.subCityName,
          zipCode: subcity.zipCode,
        }))
      );
      setIsEditing(true);
    }
  }, []);

  const addSubcity = () => {
    setSubcities([...subcities, { name: "", zipCode: "" }]);
  };

  const cancelButton = () => {
    if (isEditing) localStorage.removeItem("editCountry");
    window.location.href = "/countries";
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

  const resetForm = () => {
    setCountryName("");
    setCityName("");
    setTax("");
    setTelephoneCode("");
    setSubcities([{ name: "", zipCode: "" }]);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    let errorMessage = "";
    if (!countryName) {
      errorMessage = "Country name cannot be empty.";
    } else if (!validateFirstLetterCapital(countryName)) {
      errorMessage =
        "Country name must start with a capital letter and can only contain letters and spaces.";
    }

    if (!cityName) {
      errorMessage = errorMessage || "City name cannot be empty.";
    } else if (!validateFirstLetterCapital(cityName)) {
      errorMessage =
        errorMessage ||
        "City name must start with a capital letter and can only contain letters and spaces.";
    }

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

    if (countryData.zipCodes[0].subCityName === '' && countryData.zipCodes[0].zipCode === '') {
      countryData.zipCodes.splice(0);
    }


    let countryValid = false;

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      const isValidCountry = Array.isArray(data) && data.length > 0;

      if (isValidCountry) {
        countryValid = true;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Country is not valid.",
        });
        countryValid = false;
        return;
      }
    } catch (error) {
      countryValid = false;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Country is not valid',
      });
    }

    try {
      let apiResponse;
      if (isEditing) {
        const editCountry = JSON.parse(localStorage.getItem("editCountry"));
        apiResponse = await API.put(`/Country/${editCountry._id}`, countryData);
      } else {
        apiResponse = await API.post("/Country", countryData);
      }
  
      if (apiResponse.status === 200 || apiResponse.status === 201 && countryValid) {
        Swal.fire(
          "Success",
          `Country ${isEditing ? "updated" : "created"} successfully!`,
          "success"
        );
        resetForm();
        localStorage.removeItem("editCountry");
        if (isEditing) {
          window.location.href = "/countries";
        }
      }
    } catch (error) {
      console.error("There was an error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "There was an error",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        {isEditing ? `EDIT COUNTRY ${countryName}` : "CREATE NEW COUNTRY"}
      </div>
      <form className="form-body" onSubmit={handleCreateOrUpdate}>
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
            {isEditing ? "Save" : "Create"}
          </button>
          <button type="button" className="cancel-btn" onClick={cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
