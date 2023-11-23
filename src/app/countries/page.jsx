"use client";
import React, { useState, useEffect } from "react";
import AvailableCountries from "@/components/Countries/AvailableCountries";
import API from "@/components/Api/api";
import Swal from 'sweetalert2';
import axios from "axios";

const Page = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await API.get("/Country");
        const countriesData = await Promise.all(
          response.data.map(async (country) => {
            try {
              const res = await axios.get(`https://restcountries.com/v3.1/name/${country.countryName}`);
              const [data] = await res.data;
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

  const deleteCountry = async (countryName, cityName) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${cityName} from ${countryName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/Country/name/${countryName}/city/${cityName}`);
        setCountries(
          countries.filter((country) => country.countryName !== countryName)
        );
        Swal.fire(
          "Deleted!",
          `${cityName} in ${countryName} has been deleted.`,
          "success"
        ).then(() => {
          window.location.href = "/countries";
        });
      } catch (error) {
        console.error("Error deleting country:", error);
        Swal.fire(
          "Error!",
          `There was an issue deleting ${cityName} in ${countryName}.`,
          "error"
        );
      }
    }
  };

  return (
    <div>
      <AvailableCountries countries={countries} onDelete={deleteCountry} />
    </div>
  );
};

export default Page;
