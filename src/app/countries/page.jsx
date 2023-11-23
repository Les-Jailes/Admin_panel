"use client";
import React, { useState, useEffect } from "react";
import AvailableCountries from "@/components/Countries/AvailableCountries";
import API from "@/components/Api/api";

const page = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await API.get("/Country");
        const countriesData = await Promise.all(
          response.data.map(async (country) => {
            try {
              const res = await fetch(`https://restcountries.com/v3.1/name/${country.countryName}`);
              const [data] = await res.json();
              return {
                ...country,
                flagUrl: data.flags.png, 
              };
            } catch (fetchError) {
              console.error(`Error fetching flag for ${country.countryName}:`, fetchError);
              return {
                ...country,
                flagUrl: "/path/to/default/flag/image.png", 
              };
            }
          })
        );

        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <AvailableCountries countries={countries} />
    </div>
  );
};

export default page;
