import axios from "axios";
import { useState } from "react";
import apiPath from "../../../isProduction";
import "./ReviewPopup.scss";
import { useNavigate } from "react-router-dom";

const ReviewPopup = ({ reviewInfo }) => {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const [check, setCheck] = useState(false);
  const [isError, setIsError] = useState(false);

  const [thanks, setThanks] = useState(false);

  const navigate = useNavigate();

  async function submitReview() {
    setCheck(true);

    if (title.length > 5) {
      setIsError(true);
    } else if (review.length > 10) {
      setIsError(true);
    } else if (rating > 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (!isError) {
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

          setTimeout(() => {
            navigate("/patient-dashboard/dashboard");
          }, 3200);
        }
      } catch (err) {
        alert("Can't Add your Review, Try Again Later!");
      }
    }
  }

  if (thanks) {
    setTimeout(() => {
      navigate(
        `/patient-dashboard/appointments/doctor/${reviewInfo?.doctorUsername}`
      );
    }, 3200);
  }

  if (reviewInfo) {
    if (!thanks) {
      return (
        <div id="review-popup">
          <h2>
            Write your Feedback about <b>Dr. {reviewInfo?.doctorName}</b>
          </h2>
          <img src={reviewInfo?.doctorImg} alt={reviewInfo?.doctorName} />

          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onInput={(e) => {
              setTitle(e.target.value);
            }}
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
            placeholder="e.g. 'The Doctor was Very Kind and Professional.'"
          ></textarea>

          <button onClick={() => submitReview()}>Add Review</button>
        </div>
      );
    } else {
      return (
        <div id="thanks">
          <h1>Your Review has Successfully Added!</h1>

          <img src="" alt="Success Image" />

          <h2>Thanks for Sharing Your Feedback</h2>

          <p>Redirecting to Appointments History... </p>
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default ReviewPopup;
