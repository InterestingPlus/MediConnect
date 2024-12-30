import React from "react";
import { Link } from "react-router-dom";
import err from "../images/404.gif";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div id="err-404">
      <img src={err} />
      <h1>404 Error</h1>
      <h3>Not Found!</h3>
      <p>We Can't Find this Page!</p>
      <Link to="/">
        <button>
          Go to Home <i class="fa-solid fa-house"></i>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
