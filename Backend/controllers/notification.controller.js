// Import Notification model
const Notification = require("../models/notification.model"); // Ensure you have a Notification schema set up

// Create notification function
const createNotification = async (
  recipientId,
  recipientType,
  type,
  message
) => {
  const notification = await Notification.create({
    recipientId,
    recipientType,
    type,
    message,
  });

  return notification;
};

module.exports = { createNotification };
