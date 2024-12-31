import axios from "axios";
import React, { useEffect, useState } from "react";
import apiPath from "../../../isProduction";

function DoctorFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    specialization: "",
    minRating: "",
    maxFee: "",
    country: "",
    state: "",
    district: "",
    city: "",
    sortBy: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [hide, setHide] = useState(false);

  // Update filter values
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedFilters = { ...filters, [name]: value };

    if (name == "maxFee" && value == 0) {
      updatedFilters = { ...filters, maxFee: "" };
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent of changes
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const data = await axios.get(`${apiPath()}/get-all-categories`);

        const sortedCategory = data.data.data.map((category) => {
          return category.name;
        });

        setAllCategories(sortedCategory.sort());
      } catch (err) {
        alert("Can't Fetch All Categories..!");
      }
    }

    getCategories();
  }, []);

  return (
    <div className="filter-container">
      <h3
        onClick={() => {
          setHide((prev) => !prev);
        }}
      >
        Filter & Sort Doctors
        {hide ? (
          <i class="fi fi-ss-angle-circle-down" id="down"></i>
        ) : (
          <i class="fi fi-bs-angle-circle-up" id="up"></i>
        )}
      </h3>

      <hr />

      {hide ? (
        <section>
          <div className="filter-group">
            {/* Specialization */}
            <label htmlFor="specialization">Specialization:</label>
            <select
              id="specialization"
              name="specialization"
              placeholder="Enter specialization"
              value={filters.specialization}
              onChange={handleInputChange}
            >
              <option selected value="">
                Select Category
              </option>

              {allCategories?.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>

          <div className="filter-group">
            {/* Rating */}
            <label htmlFor="minRating">
              Minimum Rating: {filters?.minRating}
            </label>
            <input
              type="range"
              id="minRating"
              name="minRating"
              value={filters.minRating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.5"
            />
          </div>

          <div className="filter-group">
            {/* Maximum Fee */}
            <label htmlFor="maxFee">Maximum Fee (₹): {filters?.maxFee}</label>
            <input
              type="range"
              id="maxFee"
              name="maxFee"
              placeholder="e.g., 2000"
              value={filters.maxFee}
              onChange={handleInputChange}
              min="0"
              max="2000"
            />
          </div>

          <div className="filter-group">
            {/* Country */}
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter country"
              value={filters.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="filter-group">
            {/* State */}
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter state"
              value={filters.state}
              onChange={handleInputChange}
            />
          </div>

          <div className="filter-group">
            {/* District */}
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter district"
              value={filters.district}
              onChange={handleInputChange}
            />
          </div>

          <div className="filter-group">
            {/* City */}
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>

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
                  value="fee"
                  checked={filters.sortBy === "fee"}
                  onChange={handleInputChange}
                />
                Consultation Fee
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

export default DoctorFilter;
