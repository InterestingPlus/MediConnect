import React, { useState } from "react";
import FilterLocation from "../patient/FilterLocation";

function HospitalFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    country: "",
    state2: "",
    city: "",
    sortBy: "",
  });

  const [hide, setHide] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Update filter values
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedFilters = { ...filters, [name]: value };

    setFilters(updatedFilters);

    onFilterChange(updatedFilters); // Notify parent of changes
  };

  return (
    <div className="filter-container">
      <h3
        onClick={() => {
          setHide((prev) => !prev);
        }}
      >
        Filter & Sort Hospitals
        {hide ? (
          <i class="fi fi-ss-angle-circle-down" id="down"></i>
        ) : (
          <i class="fi fi-bs-angle-circle-up" id="up"></i>
        )}
      </h3>

      <hr />

      {/* <button
        type="button"
        onClick={searchByCurrentLocation}
        className="search-by-location"
      >
        Search By Current Location
      </button>
      <br /> */}

      {hide ? (
        <section>
          <FilterLocation
            setFilters={setFilters}
            onFilterChange={onFilterChange}
            useCurrentLocation={useCurrentLocation}
          />

          <div className="filter-group" id="sort">
            {/* Sort Options */}
            <label>Sort By:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value=""
                  checked={filters.sortBy === ""}
                  onChange={handleInputChange}
                />
                None
              </label>

              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value="alphabetical"
                  checked={filters.sortBy === "alphabetical"}
                  onChange={handleInputChange}
                />
                Alphabetical
              </label>

              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value="rating"
                  checked={filters.sortBy === "rating"}
                  onChange={handleInputChange}
                />
                Rating
              </label>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HospitalFilter;
