import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Thanks from "../../../../src/images/shooting-star.gif";
import apiPath from "../../../isProduction";
import "../patient/ReviewPopup.scss";

function AddPrescription({ reviewInfo }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitMp3 =
    "https://frontent-mentor-projects.netlify.app/1%20newbie/interactive-rating-component/submit.mp3";
  let sub = new Audio(submitMp3);

  if (reviewInfo?.title) {
    setTitle(reviewInfo?.title);
  }
  if (reviewInfo?.review) {
    setReview(reviewInfo?.review);
  }
  if (reviewInfo?.rating) {
    setRating(Number(reviewInfo?.rating));
  }

  const [thanks, setThanks] = useState(false);

  const navigate = useNavigate();

  async function submitReview() {
    setisLoading(true);

    if (title.length > 5 && review.length > 10 && Number(rating) > 0) {
      setIsError(false);

      try {
        const data = await axios.post(`${apiPath()}/add-review`, {
          title,
          review,
          rating,
          doctorId: reviewInfo.doctorId,
          patientId: reviewInfo.patientId,
        });

        if (data) {
          setThanks(true);
          sub.play();
        }
        setisLoading(false);
      } catch (err) {
        alert("Can't Add your Review, Try Again Later!");
      }
    } else {
      setIsError(true);
      setisLoading(false);
    }
  }

  useEffect(() => {
    if (thanks) {
      setTimeout(() => {
        navigate(
          `/patient-dashboard/appointments/doctor/${reviewInfo?.doctorUsername}#review`
        );
      }, 3200);
    }
  }, [thanks]);

  if (reviewInfo) {
    return (
      <section className="review">
        {!thanks ? (
          <div id="review-popup">
            <h2>Share your Feedback</h2>
            <p>Recently Visited</p>
            <img
              src={
                reviewInfo?.doctorImg ||
                "https://img.freepik.com/premium-vector/doctor-woman-smiling-profile-cartoon_18591-60679.jpg"
              }
              alt={reviewInfo?.doctorName}
              className="doctor"
            />
            <h1 className="doctor">Dr. {reviewInfo?.doctorName}</h1>

            <label htmlFor="rating" className="rating">
              Rating
            </label>
            <div id="star" className={isError ? (rating > 0 ? "" : "err") : ""}>
              <label htmlFor="one">
                {rating >= 1 ? (
                  <i className="fi fi-sc-star"></i>
                ) : (
                  <i className="fi fi-rr-star"></i>
                )}
              </label>
              <label htmlFor="two">
                {rating >= 2 ? (
                  <i className="fi fi-sc-star"></i>
                ) : (
                  <i className="fi fi-rr-star"></i>
                )}
              </label>
              <label htmlFor="three">
                {rating >= 3 ? (
                  <i className="fi fi-sc-star"></i>
                ) : (
                  <i className="fi fi-rr-star"></i>
                )}
              </label>
              <label htmlFor="four">
                {rating >= 4 ? (
                  <i className="fi fi-sc-star"></i>
                ) : (
                  <i className="fi fi-rr-star"></i>
                )}
              </label>
              <label htmlFor="five">
                {rating >= 5 ? (
                  <i className="fi fi-sc-star"></i>
                ) : (
                  <i className="fi fi-rr-star"></i>
                )}
              </label>
              <input
                type="checkbox"
                name="rating"
                id="one"
                onChange={() => {
                  setRating(1);
                }}
                checked={rating >= 1}
              />
              <input
                type="checkbox"
                name="rating"
                id="two"
                onChange={() => {
                  setRating(2);
                }}
                checked={rating >= 2}
              />
              <input
                type="checkbox"
                name="rating"
                id="three"
                onChange={() => {
                  setRating(3);
                }}
                checked={rating >= 3}
              />
              <input
                type="checkbox"
                name="rating"
                id="four"
                onChange={() => {
                  setRating(4);
                }}
                checked={rating >= 4}
              />
              <input
                type="checkbox"
                name="rating"
                id="five"
                onChange={() => {
                  setRating(5);
                }}
                checked={rating >= 5}
              />
            </div>

            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onInput={(e) => {
                setTitle(e.target.value);
              }}
              className={isError ? (title.length > 8 ? "" : "err") : ""}
              placeholder="e.g. 'Excellent Service!'"
            />

            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              id="desc"
              value={review}
              onInput={(e) => {
                setReview(e.target.value);
              }}
              className={isError ? (review.length > 10 ? "" : "err") : ""}
              placeholder="e.g. 'The Doctor was Very Kind and Professional.'"
            ></textarea>

            {isLoading ? (
              <div id="loading">
                <span className="animation"></span>
              </div>
            ) : (
              <button type="button" onClick={() => submitReview()}>
                Add Review
              </button>
            )}
          </div>
        ) : (
          <div id="thanks">
            <h1>Your Review has Successfully Added!</h1>

            <img src={Thanks} alt="Success Image" />

            <h2>Thanks for Sharing Your Feedback</h2>

            <p>Redirecting to the Dashboard... </p>
          </div>
        )}
      </section>
    );
  } else {
    return <></>;
  }
}

export default AddPrescription;
