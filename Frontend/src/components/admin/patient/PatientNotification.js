import React, { useEffect, useState } from "react";
import "../Notification.scss";

import axios from "axios";
import { io } from "socket.io-client";
import apiPath from "../../../isProduction";

const socket = io(apiPath());

const PatientNotification = () => {
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState();
  const [deletedNotification, setDeletedNotification] = useState();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user_data = JSON.parse(localStorage.getItem("profile"));

        if (!user_data?.id) {
          alert("User is not logged in or profile is missing.");
        }

        setUser(user_data);

        const response = await axios.post(`${apiPath()}/get-all-notification`, {
          recipientId: user_data.id,
        });

        if (response.data.status) {
          setNotifications(response.data.data || []);
        } else {
          alert(response.data.message || "Failed to fetch notifications.");
        }
      } catch (err) {
        alert("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [deletedNotification, notifications]);

  useEffect(() => {
    socket.on("new-notification", (data) => {
      console.log(data);
      setNotifications((prev) => {
        return [data, ...prev];
      });
    });
  }, []);

  async function handleDelete(notification_id) {
    try {
      await axios.post(`${apiPath()}/delete-notification`, {
        id: notification_id,
      });

      setDeletedNotification(notification_id);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="notification">
      <h1>Notifications</h1>
      {notifications ? (
        notifications.length > 0 ? (
          <ul className="notifications">
            {notifications.map((n, index) => (
              <li key={index}>
                <div>
                  <h2>{n?.type}</h2>
                  <p>{n?.message}</p>
                </div>

                {n._id ? (
                  <button
                    onClick={() => {
                      handleDelete(n._id);
                    }}
                  >
                    <i class="fi fi-ss-cross-circle"></i>
                  </button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
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
            <h3>You don't have Any Notifications..!</h3>
          </div>
        )
      ) : (
        <div id="loading">
          <span className="animation"></span>
          <h1>Fetching Your Details...</h1>
        </div>
      )}
    </div>
  );
};

export default PatientNotification;
