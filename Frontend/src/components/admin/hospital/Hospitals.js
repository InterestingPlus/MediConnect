import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiPath from "../../../isProduction";
import "../patient/Book.scss";
import HospitalFilter from "./HospitalFilter";

function AllHospitals() {
  const [doctors, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Check if more data is available

  const [filteredDoctors, setFilteredHospitals] = useState([]); // Doctors after applying filters
  const [filters, setFilters] = useState({
    country: "",
    state2: "",
    city: "",
    sortBy: "",
  });

  // Fetch doctors with pagination
  useEffect(() => {
    async function getHospitals() {
      try {
        setLoading(true);

        const response = await axios.get(
          `${await apiPath()}/get-hospitals?page=${page}`
        );
        const { data } = response.data;

        if (data.length > 0) {
          setHospitals(data);
          setHasMore(data.length === 8);
        } else {
          setHasMore(false);
        }

        setLoading(false); // Hide loader
      } catch (err) {
        alert("Cannot Find Doctors!");
        setLoading(false);
      }
    }
    getHospitals();
  }, []);

  // Search functionality
  async function handleSearch() {
    try {
      setLoading(true);

      const response = await axios.post(`${await apiPath()}/search-hospital`, {
        search,
      });

      const { data } = response.data;
      setHospitals(data);
      setHasMore(false);
      setLoading(false);
    } catch (err) {
      alert("Cannot Search Hospitals!");
      setLoading(false);
    }
  }

  const handleLoadMore = async () => {
    setPage((prev) => ++prev); // Increment page to load more
    try {
      setLoading(true);
      const response = await axios.get(
        `${await apiPath()}/get-hospitals?page=${page}&limit=8`
      );
      const { data } = response.data;

      if (data.length > 0) {
        setHospitals((prevDoctors) => {
          if (page == 1) {
            return data;
          } else {
            return [...prevDoctors, ...data];
          }
        });
        setHasMore(data.length === 8);
      } else {
        setHasMore(false);
      }

      setLoading(false); // Hide loader
    } catch (err) {
      alert("Cannot Find Hospitals!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...doctors];

      // Filter by rating
      if (filters.minRating) {
        filtered = filtered.filter(
          (hospital) => hospital?.avgRating >= parseFloat(filters.minRating)
        );
      }

      // Filter by location (country, state, city)
      if (filters.country) {
        filtered = filtered.filter((hospital) =>
          hospital?.address?.country
            ?.toLowerCase()
            ?.includes(filters.country?.toLowerCase())
        );
      }
      if (filters.state2) {
        filtered = filtered.filter((hospital) =>
          hospital?.address?.state
            ?.toLowerCase()
            ?.includes(filters.state2?.toLowerCase())
        );
      }
      if (filters.city) {
        filtered = filtered.filter((hospital) =>
          hospital?.address?.city
            ?.toLowerCase()
            ?.includes(filters.city?.toLowerCase())
        );
      }

      // Sorting
      if (filters.sortBy === "alphabetical") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === "rating") {
        filtered.sort((a, b) => b?.avgRating - a?.avgRating);
      }

      setFilteredHospitals(filtered); // Update the filtered doctors state
    };

    applyFilters();
  }, [doctors, filters]);

  return (
    <>
      <h1 id="list-heading">All Hospitals</h1>

      <section id="search-box">
        <div>
          <input
            type="text"
            placeholder="Search Hospitals"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <i className="fi fi-br-search"></i>
          </button>
        </div>
      </section>

      <HospitalFilter onFilterChange={setFilters} />

      <ul id="all-doctors">
        {filteredDoctors.length > 0 ? (
          filteredDoctors
            .filter((hospital) =>
              hospital.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((hospital, index) => (
              <Link
                to={`/patient-dashboard/hospital/${hospital._id}`}
                key={index}
              >
                <li key={index}>
                  <img
                    className="white"
                    src={
                      hospital?.profileImg
                        ? hospital.profileImg
                        : "https://cdn-icons-png.flaticon.com/512/4521/4521401.png"
                    }
                    alt="profile-pic"
                  />
                  <span>
                    <h1>{hospital?.name}</h1>
                    <div className="rating">
                      {hospital?.avgRating
                        ? Array.from({ length: 5 }).map((_, index) => {
                            if (index < Math.floor(hospital?.avgRating)) {
                              return (
                                <i key={index} className="fi fi-sc-star"></i>
                              ); // Filled star
                            } else {
                              return (
                                <i key={index} className="fi fi-rr-star"></i>
                              ); // Blank star
                            }
                          })
                        : ""}
                    </div>
                    <h2>State: {hospital?.address?.state}</h2>
                    <h2>City: {hospital?.address?.city}</h2>
                  </span>
                </li>
              </Link>
            ))
        ) : loading ? (
          <div id="loading">
            <span className="animation"></span>
            <h1>Fetching All Hospitals...</h1>
          </div>
        ) : (
          <div id="not-found">
            <dotlottie-player
              src="https://lottie.host/a7a63795-79b1-422b-81fc-797d952a8682/BEHP79u2q9.lottie"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></dotlottie-player>
            <h3>No Hospitals Available</h3>
          </div>
        )}
      </ul>

      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More Hospitals
        </button>
      )}
      {loading && <p className="loading-more">Loading more Hospitals...</p>}
    </>
  );
}

export default AllHospitals;
