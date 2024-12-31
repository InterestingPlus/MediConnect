import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiPath from "../../../isProduction";
import "./Book.scss";
import DoctorFilter from "./DoctorFilter";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Check if more data is available

  const [filteredDoctors, setFilteredDoctors] = useState([]); // Doctors after applying filters
  const [filters, setFilters] = useState({
    specialization: "",
    minRating: "",
    maxFee: "",
    gender: "",
    country: "",
    state2: "",
    city: "",
    sortBy: "",
  });

  // Fetch doctors with pagination
  useEffect(() => {
    async function getDoctors() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${await apiPath()}/get-doctor?page=${page}`
        );
        const { data } = response.data;

        if (data.length > 0) {
          setDoctors(data);
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
    getDoctors();
  }, []);

  // Search functionality
  async function handleSearch() {
    try {
      setLoading(true);

      const response = await axios.post(`${await apiPath()}/search-doctor`, {
        search,
      });

      const { data } = response.data;
      setDoctors(data);
      setHasMore(false);
      setLoading(false);
    } catch (err) {
      alert("Cannot Search Doctors!");
      setLoading(false);
    }
  }

  const handleLoadMore = async () => {
    setPage((prev) => ++prev); // Increment page to load more
    try {
      setLoading(true);
      const response = await axios.get(
        `${await apiPath()}/get-doctor?page=${page}&limit=8`
      );
      const { data } = response.data;

      if (data.length > 0) {
        setDoctors((prevDoctors) => {
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
      alert("Cannot Find Doctors!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...doctors];

      // Filter by specialization
      if (filters.specialization) {
        filtered = filtered.filter((doctor) =>
          doctor?.specialization
            .toLowerCase()
            .includes(filters.specialization.toLowerCase())
        );
      }

      // Filter by rating
      if (filters.minRating) {
        filtered = filtered.filter(
          (doctor) => doctor?.avgRating >= parseFloat(filters.minRating)
        );
      }

      // Filter by maximum fee
      if (filters.maxFee) {
        filtered = filtered.filter(
          (doctor) => doctor?.consultationCharge <= parseFloat(filters.maxFee)
        );
      }

      // Filter by location (country, state, city)
      if (filters.country) {
        filtered = filtered.filter((doctor) =>
          doctor?.address?.country
            ?.toLowerCase()
            ?.includes(filters.country?.toLowerCase())
        );
      }
      if (filters.state2) {
        filtered = filtered.filter((doctor) =>
          doctor?.address?.state
            ?.toLowerCase()
            ?.includes(filters.state2?.toLowerCase())
        );
      }
      if (filters.city) {
        filtered = filtered.filter((doctor) =>
          doctor?.address?.city
            ?.toLowerCase()
            ?.includes(filters.city?.toLowerCase())
        );
      }
      if (filters.gender) {
        filtered = filtered.filter(
          (doctor) =>
            doctor?.gender?.toLowerCase() == filters.gender?.toLowerCase()
        );
      }

      // Sorting
      if (filters.sortBy === "alphabetical") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.sortBy === "fee") {
        filtered.sort((a, b) => a?.consultationCharge - b?.consultationCharge);
      } else if (filters.sortBy === "rating") {
        filtered.sort((a, b) => b?.avgRating - a?.avgRating);
      }

      setFilteredDoctors(filtered); // Update the filtered doctors state
    };

    applyFilters();
  }, [doctors, filters]);

  return (
    <>
      <h1 id="list-heading">
        <b>
          <i className="fa-solid fa-user-doctor"></i> Select Doctor
        </b>{" "}
        to <br /> Book Appointment
      </h1>

      <section id="search-box">
        <div>
          <input
            type="text"
            placeholder="Search Doctor"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <i className="fi fi-br-search"></i>
          </button>
        </div>
      </section>

      <DoctorFilter onFilterChange={setFilters} />

      <ul id="all-doctors">
        {filteredDoctors.length > 0 ? (
          filteredDoctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((doctor, index) => (
              <Link
                to={`/patient-dashboard/appointments/doctor/${doctor.username}`}
                key={index}
              >
                <li>
                  <img
                    className="white"
                    src={
                      doctor?.profileImg
                        ? doctor.profileImg
                        : doctor?.gender == "female"
                        ? "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"
                        : "https://cdn-icons-png.flaticon.com/512/8815/8815112.png"
                    }
                    alt="profile-pic"
                  />
                  <span>
                    <h1>Dr. {doctor?.name}</h1>
                    <h2>{doctor?.specialization}</h2>
                    <h3>Fee: {doctor?.consultationCharge}₹</h3>
                    <div className="rating">
                      {doctor?.avgRating
                        ? Array.from({ length: 5 }).map((_, index) => {
                            if (index < doctor?.avgRating) {
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
                  </span>
                </li>
              </Link>
            ))
        ) : loading ? (
          <div id="loading">
            <span className="animation"></span>
            <h1>Fetching All Doctors...</h1>
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
            <h3>No Doctors Available</h3>
          </div>
        )}
      </ul>

      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More Profiles
        </button>
      )}
      {loading && <p className="loading-more">Loading more Doctors...</p>}
    </>
  );
}

export default AllDoctors;
