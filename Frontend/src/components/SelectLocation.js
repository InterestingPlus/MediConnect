import axios from "axios";
import React, { useEffect, useState } from "react";

function SelectLocation({ setValues }) {
  const config = {
    cUrl: "https://api.countrystatecity.in/v1",
    cKey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch countries on component mount
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(`${config.cUrl}/countries`, {
          headers: { "X-CSCAPI-KEY": config.cKey },
        });
        setCountries(response.data);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      async function fetchStates() {
        try {
          const response = await axios.get(
            `${config.cUrl}/countries/${selectedCountry.iso2}/states`,
            { headers: { "X-CSCAPI-KEY": config.cKey } }
          );
          setStates(response.data);
          setValues((prev) => ({ ...prev, country: selectedCountry.name })); // Update country name
        } catch (error) {
          console.error("Error loading states:", error);
        }
      }
      fetchStates();
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, setValues]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      async function fetchCities() {
        try {
          const response = await axios.get(
            `${config.cUrl}/countries/${selectedCountry.iso2}/states/${selectedState.iso2}/cities`,
            { headers: { "X-CSCAPI-KEY": config.cKey } }
          );
          setCities(response.data);
          setValues((prev) => ({ ...prev, state2: selectedState.name })); // Update state name
        } catch (error) {
          console.error("Error loading cities:", error);
        }
      }
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState, setValues]);

  // Update city in form when a city is selected
  useEffect(() => {
    if (selectedCity) {
      setValues((prev) => ({ ...prev, city: selectedCity }));
    }
  }, [selectedCity, setValues]);

  return (
    <>
      {/* Country Dropdown */}
      <label htmlFor="country">Country:</label>
      <select
        name="country"
        id="country"
        onChange={(e) => {
          setSelectedCountry(
            countries.find((country) => country.iso2 === e.target.value)
          );
        }}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.iso2} value={country.iso2}>
            {country.name}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <label htmlFor="state">State:</label>
      <select
        name="state2"
        id="state"
        onChange={(e) =>
          setSelectedState(
            states.find((state) => state.iso2 === e.target.value)
          )
        }
        disabled={!selectedCountry}
        required
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.iso2} value={state.iso2}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <label htmlFor="city">City:</label>
      <select
        name="city"
        id="city"
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedState}
        required
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectLocation;
