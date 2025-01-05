import axios from "axios";
import React, { useEffect, useState } from "react";

function FilterLocation({ setFilters, onFilterChange }) {
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
          setFilters((prev) => ({
            ...prev,
            country: selectedCountry.name,
            state2: "",
            city: "",
          })); // Reset state and city in parent
          onFilterChange((prev) => ({
            ...prev,
            country: selectedCountry.name,
            state2: "",
            city: "",
          })); // Reset state and city in parent
        } catch (error) {
          console.error("Error loading states:", error);
        }
      }
      fetchStates();
    } else {
      setStates([]);
      setCities([]);
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry, setFilters, onFilterChange]);

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
          setFilters((prev) => ({
            ...prev,
            state2: selectedState.name,
            city: "",
          })); // Reset city in parent
          onFilterChange((prev) => ({
            ...prev,
            state2: selectedState.name,
            city: "",
          })); // Reset city in parent
        } catch (error) {
          console.error("Error loading cities:", error);
        }
      }
      fetchCities();
    } else {
      setCities([]);
      setSelectedCity("");
      setSelectedState("");
    }
  }, [selectedCountry, selectedState, setFilters, onFilterChange]);

  // Update city in form when a city is selected
  useEffect(() => {
    if (selectedCity) {
      setFilters((prev) => ({ ...prev, city: selectedCity }));
      onFilterChange((prev) => ({ ...prev, city: selectedCity }));
    } else {
      setFilters((prev) => ({ ...prev, city: "" }));
      onFilterChange((prev) => ({ ...prev, city: "" }));
    }
  }, [selectedCity, setFilters, onFilterChange]);

  return (
    <>
      {/* Country Dropdown */}
      <div className="filter-group">
        <label htmlFor="country">Country:</label>
        <select
          name="country"
          id="country"
          onChange={(e) => {
            if (e.target.value == "") {
              setSelectedCountry("");
              setFilters((prev) => ({
                ...prev,
                country: "",
                state2: "",
                city: "",
              }));
              onFilterChange((prev) => ({
                ...prev,
                country: "",
                state2: "",
                city: "",
              }));
            } else {
              setSelectedCountry(
                countries.find((country) => country.iso2 === e.target.value)
              );
            }
            setSelectedState(""); // Reset state
            setSelectedCity(""); // Reset city
          }}
        >
          <option value="">All Country</option>
          {countries.map((country) => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      <div className="filter-group">
        <label htmlFor="state">State:</label>
        <select
          name="state2"
          id="state"
          onChange={(e) => {
            console.log(e.target.value);

            if (e.target.value == "") {
              setSelectedState("");
              setFilters((prev) => ({
                ...prev,
                state2: "",
                city: "",
              }));
              onFilterChange((prev) => ({
                ...prev,
                state2: "",
                city: "",
              }));
            } else {
              setSelectedState(
                states.find((state) => state.iso2 === e.target.value)
              );
            }
            setSelectedCity(""); // Reset city
          }}
          disabled={!selectedCountry}
        >
          <option value="">All State</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="filter-group">
        <label htmlFor="city">City:</label>
        <select
          name="city"
          id="city"
          onChange={(e) => {
            if (e.target.value == "") {
              setSelectedCity("");
              setFilters((prev) => ({
                ...prev,
                city: "",
              }));
              onFilterChange((prev) => ({
                ...prev,
                city: "",
              }));
            } else {
              setSelectedCity(e.target.value);
            }
          }}
          disabled={!selectedState}
        >
          <option value={""}>All City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FilterLocation;
